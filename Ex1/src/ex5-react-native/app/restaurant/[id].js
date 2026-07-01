import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../styles/Theme'; 
import { useNavigation } from 'expo-router';
import { styles } from '../../styles/[id].styles'; 


export default function RestaurantScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams(); 
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity key={dish.id || dish._id} style={styles.dishCard}>
            <View style={styles.dishInfo}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text style={styles.dishDesc} numberOfLines={2}>{dish.description}</Text>
              <Text style={styles.dishPrice}>₪{dish.price}</Text>
            </View>
            {dish.image && (
              <Image source={{ uri: dish.image }} style={styles.dishImage} />
            )}
          </TouchableOpacity>
        ))
      )}
      
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

