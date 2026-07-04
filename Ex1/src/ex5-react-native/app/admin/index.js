import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { styles } from '../../styles/admin.styles';
import { COLORS } from '../../styles/Theme';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = true;

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

  useFocusEffect(
    useCallback(() => {
      fetchRestaurants();
    }, [])
  );

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
                headers: {
                  'Content-Type': 'application/json',
                  'x-user-id': global.userId,
                  'Authorization': `Bearer ${global.token}`
                }
              });
             
              if (res.status === 401 || res.status === 403) {
                Alert.alert("Permission Denied", "You do not have the required permissions to perform this action.");
                return;
              }

              if (res.ok || res.status === 204) {
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
     
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Manage Restaurants</Text>
       
        {isAdmin && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.push('/admin/create')}
          >
            <Text style={styles.addBtnText}>+ Add New</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : restaurants.length === 0 ? (
        <Text style={styles.emptyText}>No restaurants found.</Text>
      ) : (
        restaurants.map(r => (
          // הפכנו את הכרטיסייה כולה ללחיצה כדי להיכנס למנות!
          <TouchableOpacity
            key={r.id || r._id}
            style={styles.card}
            onPress={() => router.push(`/admin/dishes/${r.id || r._id}`)}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.restaurantName}>{r.name}</Text>
              <Text style={styles.restaurantDesc} numberOfLines={1}>{r.cuisineType || 'No cuisine type'}</Text>
            </View>

            {isAdmin && (
              <View style={styles.actionsContainer}>
               
                <TouchableOpacity
                  style={[styles.actionBtn, styles.editBtn]}
                  onPress={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/edit/${r.id || r._id}`);
                  }}
                >
                  <Text style={{ color: '#555', fontWeight: 'bold' }}>✏️ Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.deleteBtn]}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDelete(r.id || r._id);
                  }}
                >
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>🗑️ Delete</Text>
                </TouchableOpacity>

              </View>
            )}
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}