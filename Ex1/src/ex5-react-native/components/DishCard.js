import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from './CartContext'; 

export default function DishCard({ dish, restaurantId }) {
  const { addToCart } = useCart(); 

  const handleAdd = () => {
    addToCart(dish, restaurantId);
    alert('Item added to cart! 🛒');
  };

  return (
    <View style={styles.dishCard}>
      <View style={styles.dishInfo}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Text style={styles.dishDesc} numberOfLines={2}>{dish.description}</Text>
        <Text style={styles.dishPrice}>₪{dish.price}</Text>
        
        {/* כפתור ההוספה לעגלה */}
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+ Add to Cart</Text>
        </TouchableOpacity>
      </View>
      
      <Image 
        source={{ uri: dish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150" }} 
        style={styles.dishImage} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dishCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishInfo: {
    flex: 1,
    paddingRight: 16,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  dishDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C2E8',
  },
  dishImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#00C2E8',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  }
});