import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { styles } from '../../styles/[id].styles'; 
import DishCard from '../../components/DishCard'; 
import { useCart } from '../../components/CartContext';

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  
  const { cartItems } = useCart();
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    setIsLoading(true);
    setRestaurant(null);
    setMenu([]);

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${id}`)
      .then(res => res.json())
      .then(data => {
        setRestaurant(data);
        if (data.menu) setMenu(data.menu);
        navigation.setOptions({ headerTitle: data.name });
      })
      .catch(err => console.error("Error fetching restaurant details:", err));

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${id}/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMenu(data);
        } else if (data && Array.isArray(data.products) && data.products.length > 0) {
          setMenu(data.products);
        }
      })
      .catch(err => console.error("Error fetching products:", err))
      .finally(() => setIsLoading(false));
      
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00C2E8" />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Restaurant not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>
          <Text style={styles.infoText}>⭐ {restaurant.averageRating} | 📍 {restaurant.address}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.menuTitle}>Menu</Text>
        
        {menu.length === 0 ? (
          <Text style={styles.emptyMenuText}>No items available in the menu yet.</Text>
        ) : (
          menu.map((dish) => (
            <DishCard key={dish.id || dish._id} dish={dish} restaurantId={id} />
          ))
        )}
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {cartItems.length > 0 && (
        <TouchableOpacity 
          style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            right: 20,
            backgroundColor: '#00C2E8',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={() => router.push('/cart')}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            View Cart ({cartItems.length}) - ₪{cartTotal.toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}