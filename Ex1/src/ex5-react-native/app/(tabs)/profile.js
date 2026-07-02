import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    useCallback(() => {
      // Checking if a user is logged in
      if (!global.token || !global.userId) {
        setIsLoading(false);
        return;
      }

      // Retrieving data from the server by ID
      const fetchUserData = async () => {
        try {
          const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${global.userId}`);
          if (res.ok) {
            const data = await res.json();
            setUserData(data);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setIsLoading(false);
        }
      };

    fetchUserData();
  }, [])
   );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // User is not logged in
  if (!userData) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>You are not logged in.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/login')}>
          <Text style={styles.btnText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // User is logged in
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: userData.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} 
        style={styles.profileImage} 
      />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.detail}>Role: {userData.role}</Text>
      <Text style={styles.detail}>Address: {userData.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 80,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  btn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});