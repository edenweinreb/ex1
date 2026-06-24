import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo-vector-icons';
import { styles } from '../../styles/index.styles'; 
import { COLORS } from '../../styles/Theme'; 

export default function DashboardScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Home screen categories
  const categories = [
    { name: 'Bakery', type: 'bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150' },
    { name: 'Desserts', type: 'dessert', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150' },
    { name: 'Burgers', type: 'burger', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=150' },
    { name: 'Pizza', type: 'pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150' },
  ];

  useEffect(() => {
    // Fetch data from the server using the environment variable defined in .env
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants`)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching restaurants:", err);
        setIsLoading(false);
      });
  }, []);

  // Filtering logic
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name ? restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchesCuisine = selectedCuisine 
      ? restaurant.cuisineType && restaurant.cuisineType.toLowerCase() === selectedCuisine.toLowerCase()
      : true;
    return matchesSearch && matchesCuisine;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Horizontal Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat.type} 
            style={[styles.categoryItem, selectedCuisine === cat.type && styles.categoryItemActive]}
            onPress={() => setSelectedCuisine(selectedCuisine === cat.type ? '' : cat.type)}
          >
            <Image source={{ uri: cat.img }} style={styles.categoryImg} />
            <Text style={styles.categoryName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Restaurants List */}
      <Text style={styles.sectionTitle}>Recommended Restaurants</Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : filteredRestaurants.length === 0 ? (
        <Text style={styles.noResultsText}>No restaurants found matching your search.</Text>
      ) : (
        <View style={styles.restaurantsGrid}>
          {filteredRestaurants.map(r => (
            <TouchableOpacity key={r.id || r._id} style={styles.restaurantCard}>
              <Image 
                source={{ uri: r.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600" }} 
                style={styles.restaurantImg} 
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{r.name}</Text>
                <Text style={styles.restaurantDesc} numberOfLines={1}>{r.description}</Text>
                <View style={styles.restaurantFooter}>
                  <Text style={styles.ratingText}>⭐ {r.averageRating ? r.averageRating.toFixed(1) : 'New'}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <View style={styles.bottomSpacer} /> 
    </ScrollView>
  );
}