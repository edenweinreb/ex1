import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/admin.styles';
import { COLORS } from '../../styles/Theme';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch all restaurants from the server
  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      Alert.alert('Error', 'Failed to load restaurants.');
    } finally {
      setIsLoading(false);
    }
  };

  // Re-fetch data every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchRestaurants();
    }, [])
  );

  // Function to handle restaurant deletion
  const handleDelete = (id) => {
    Alert.alert(
      "Delete Restaurant",
      "Are you sure you want to delete this restaurant? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${id}`, {
                method: 'DELETE',
              });
              
              if (res.ok || res.status === 204) {
                // Remove the deleted restaurant from the local state to update the UI instantly
                setRestaurants(prev => prev.filter(r => r.id !== id && r._id !== id));
                Alert.alert("Success", "Restaurant deleted successfully.");
              } else {
                Alert.alert("Error", "Failed to delete the restaurant from the server.");
              }
            } catch (err) {
              console.error("Delete error:", err);
              Alert.alert("Error", "A network error occurred.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      
      {/* Header with Title and Add Button */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Manage Restaurants</Text>
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => router.push('/admin/create')}
        >
          <Text style={styles.addBtnText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      {/* Restaurants List */}
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : restaurants.length === 0 ? (
        <Text style={styles.emptyText}>No restaurants found.</Text>
      ) : (
        restaurants.map(r => (
          <View key={r.id || r._id} style={styles.card}>
            
            <View style={styles.infoContainer}>
              <Text style={styles.restaurantName}>{r.name}</Text>
              <Text style={styles.restaurantDesc} numberOfLines={1}>{r.cuisineType || 'No cuisine type'}</Text>
            </View>

            {/* Action Buttons (Edit & Delete) */}
            <View style={styles.actionsContainer}>
              
              {/* Edit Button */}
              <TouchableOpacity 
                style={[styles.actionBtn, styles.editBtn]}
                onPress={() => router.push(`/admin/edit/${r.id || r._id}`)}
              >
                <Ionicons name="pencil" size={18} color="#555" />
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity 
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() => handleDelete(r.id || r._id)}
              >
                <Ionicons name="trash" size={18} color="red" />
              </TouchableOpacity>

            </View>
          </View>
        ))
      )}

    </ScrollView>
  );
}