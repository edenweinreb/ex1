import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { styles }  from '../../styles/orders.styles';

export default function OrderHistory() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // Fetch user credentials and order history when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchOrdersFlow = async () => {
        try {
          setOrders([]);
          // Retrieve credentials from storage
          const storedUserId = await AsyncStorage.getItem('userId');
          const storedToken = await AsyncStorage.getItem('token');

          // Update local state
          setUserId(storedUserId);
          setToken(storedToken);

          // Stop execution if credentials are missing
          if (!storedUserId || !storedToken) {
            setOrders([]);
            return;
          }

          // Fetch orders from the server
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/user/${storedUserId}`, {
            headers: { 
              'x-user-id': storedUserId,
              'Authorization': `Bearer ${storedToken}`
            }
          });

          const data = await response.json();

          // Update orders state (ensure fallback to empty array if not an array)
          setOrders(Array.isArray(data) ? data : []);

        } catch (error) {
          console.error("Error fetching orders flow:", error);
        }
      };

      fetchOrdersFlow();
    }, [])
  );

  // Submit a restaurant rating
  const rateRestaurant = (restaurantId, score) => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${restaurantId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId ,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userRatingScore: score })
    })
      .then(res => {
        if (res.ok) Alert.alert('Thank You!', 'Your rating was submitted successfully.');
        else Alert.alert('Error', 'Failed to submit your rating.');
      })
      .catch(err => console.error("Error submitting rating:", err));
  };

  // Renders a single order card
  const renderItem = ({ item }) => {
    const orderId = item.id || item._id;
  
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/order/${orderId}`)}
      >
        <View style={styles.cardTop}>
          <View>
            <Text style={[styles.statusBadge, item.status === 'pending' ? styles.pending : styles.completed]}>
              {item.status || 'pending'}
            </Text>
  
            <Text style={styles.orderId}>Order #{orderId ? orderId.substring(0, 8) : 'N/A'}</Text>
  
            <Text style={styles.orderDate}>
              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
            </Text>
          </View>
  
          <Text style={styles.orderPrice}>₪{item.totalAmount ? item.totalAmount.toFixed(2) : '0.00'}</Text>
        </View>
  
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>Rate this restaurant:</Text>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => rateRestaurant(item.restaurantId, star)}
              >
                <Text style={styles.starIcon}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!userId ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Please log in to view orders</Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={() => router.push('/login')} 
          >
            <Text style={styles.emptyButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={Array.isArray(orders) ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10) : []}
          keyExtractor={(item) => (item.id || item._id || Math.random()).toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No orders yet</Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => router.push('/')} 
              >
                <Text style={styles.emptyButtonText}>Start Ordering</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}

