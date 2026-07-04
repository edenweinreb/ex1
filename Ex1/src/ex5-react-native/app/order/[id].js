import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { styles } from '../../styles/orderDetails.style';
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  status: { fontSize: 16, color: '#007AFF', marginBottom: 4, textTransform: 'capitalize' },
  date: { fontSize: 14, color: '#888', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 16 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  itemName: { fontSize: 16, color: '#333' },
  itemPrice: { fontSize: 16, color: '#666' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  error: { textAlign: 'center', marginTop: 50, fontSize: 18, color: 'red' }
});

export default function OrderDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the order details when the screen loads
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedToken = await AsyncStorage.getItem('token');

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/${id}`, {
          headers: {
            'x-user-id': storedUserId,
            'Authorization': `Bearer ${storedToken}`
          }
        });
        
        const data = await response.json();
        console.log("Server response:", data);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrderDetails();
  }, [id]);

  // Show a loading spinner while fetching the order
  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#000"
        style={{ flex: 1, marginTop: 50 }}
      />
    );

  // Display an error message if the order cannot be found
  // Fallback style is used if the imported styles fail to load
  if (!order)
    return (
      <Text
        style={
          styles?.error || {
            textAlign: 'center',
            marginTop: 50,
            color: 'red'
          }
        }
      >
        Order not found
      </Text>
    );

    return (
      <ScrollView style={styles.container}>
        {/* Back to Order History button */}
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '600' }}>← Back to Order History</Text>
        </TouchableOpacity>
  
        <View style={styles.card}>
          {/* Order information */}
          <Text style={styles.title}>
            Order #{order._id?.substring(0, 8)}
          </Text>
  
          <Text style={styles.status}>
            Status: {order.status || 'Processing'}
          </Text>
  
          <Text style={styles.date}>
            Date: {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : 'N/A'}
          </Text>
  
          <View style={styles.divider} />
  
          {/* Ordered items */}
          <Text style={styles.subtitle}>Items:</Text>
  
          {order.items?.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.quantity}x {item.name}
              </Text>
  
              <Text style={styles.itemPrice}>
                ₪{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
  
          <View style={styles.divider} />
  
          {/* Order total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
  
            <Text style={styles.totalAmount}>
              ₪{order.totalAmount?.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
}

