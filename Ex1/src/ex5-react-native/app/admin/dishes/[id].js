import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from '../../../styles/dishes.styles';
import { COLORS } from '../../../styles/Theme';

export default function ManageDishesScreen() {
  const { id } = useLocalSearchParams(); // Restaurant ID
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form state for a new product
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

  // 1. Fetch existing restaurant products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetching the restaurant data to get its products (adjust endpoint if needed)
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${id}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        
        // Assuming the backend returns the menu inside a 'products' or 'menu' array
        setProducts(data.products || data.menu || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  // 2. Add a new product to the restaurant
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      Alert.alert('Missing Info', 'Product name and price are required.');
      return;
    }

    setIsAdding(true);

    try {
      // POST request to add a product (Matching the logic from your Web app)
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${id}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price) // Convert price to number
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      // Add the new product to the local state to update the UI instantly
      const addedProduct = { ...newProduct, price: parseFloat(newProduct.price), _id: Math.random().toString() };
      setProducts([...products, addedProduct]);
      
      // Clear the form
      setNewProduct({ name: '', description: '', price: '' });
      Alert.alert('Success', 'Product added to menu!');

    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setIsAdding(false);
    }
  };

  // 3. Delete a product
  const handleDeleteProduct = (productId) => {
    Alert.alert("Delete Product", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive",
        onPress: async () => {
          try {
            // Adjust this endpoint based on your Node.js backend setup
            const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${id}/products/${productId}`, {
              method: 'DELETE',
            });
            
            if (res.ok || res.status === 204) {
              setProducts(products.filter(p => p._id !== productId && p.id !== productId));
            } else {
              Alert.alert('Error', 'Failed to delete product from server.');
            }
          } catch (err) {
            Alert.alert('Error', 'Network error occurred.');
          }
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Manage Menu</Text>

      {/* Add New Product Form */}
      <View style={styles.addSection}>
        <Text style={styles.sectionTitle}>Add New Item</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={newProduct.name}
          onChangeText={(val) => setNewProduct({ ...newProduct, name: val })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newProduct.description}
          onChangeText={(val) => setNewProduct({ ...newProduct, description: val })}
        />
        <TextInput
          style={styles.input}
          placeholder="Price (₪)"
          value={newProduct.price}
          onChangeText={(val) => setNewProduct({ ...newProduct, price: val })}
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={handleAddProduct}
          disabled={isAdding}
        >
          {isAdding ? <ActivityIndicator color={COLORS.background} /> : <Text style={styles.addBtnText}>+ Add to Menu</Text>}
        </TouchableOpacity>
      </View>

      {/* Existing Products List */}
      <Text style={styles.sectionTitle}>Current Menu</Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
      ) : products.length === 0 ? (
        <Text style={{ textAlign: 'center', color: COLORS.textMuted }}>No items in the menu yet.</Text>
      ) : (
        products.map((item, index) => (
          <View key={item.id || item._id || index} style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.description}</Text>
              <Text style={styles.productPrice}>₪{item.price}</Text>
            </View>
            <TouchableOpacity 
              style={styles.deleteBtn}
              onPress={() => handleDeleteProduct(item.id || item._id)}
            >
            </TouchableOpacity>
          </View>
        ))
      )}

    </ScrollView>
  );
}