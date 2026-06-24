import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from '../../../styles/create.styles'; 
import { COLORS } from '../../../styles/Theme'; 

export default function EditRestaurantScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Extracts the restaurant ID from the URL
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', description: '', address: '', phone: '', cuisineType: '', image: '', lat: '', lng: ''
  });

  // Fetch the specific restaurant data when the screen loads
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${id}`);
        if (!res.ok) throw new Error('Failed to fetch restaurant');
        
        const data = await res.json();
        
        // Populate the form with existing data (convert numbers to strings for TextInputs)
        setFormData({
          name: data.name || '',
          description: data.description || '',
          address: data.address || '',
          phone: data.phone || '',
          cuisineType: data.cuisineType || '',
          image: data.image || '',
          lat: data.lat !== undefined ? String(data.lat) : '',
          lng: data.lng !== undefined ? String(data.lng) : ''
        });
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Could not load restaurant details.');
        router.back(); // Go back if we can't load the data
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.name) {
      Alert.alert('Missing Field', 'Restaurant name is required.');
      return;
    }

    setIsSaving(true);

    try {
      // Sending a PATCH request to update only the changed fields
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lat: formData.lat ? parseFloat(formData.lat) : undefined,
          lng: formData.lng ? parseFloat(formData.lng) : undefined
        })
      });

      if (!res.ok) throw new Error('Failed to update');

      Alert.alert('Success', 'Restaurant updated successfully!');
      router.back(); // Return to the dashboard

    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update the restaurant.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Edit Restaurant</Text>

      {/* Inputs (Identical to the Create form) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} value={formData.name} onChangeText={(val) => handleChange('name', val)} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={formData.description} onChangeText={(val) => handleChange('description', val)} multiline />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} value={formData.address} onChangeText={(val) => handleChange('address', val)} />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={formData.phone} onChangeText={(val) => handleChange('phone', val)} keyboardType="phone-pad" />
        </View>

        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Cuisine Type</Text>
          <TextInput style={styles.input} value={formData.cuisineType} onChangeText={(val) => handleChange('cuisineType', val)} />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput style={styles.input} value={formData.image} onChangeText={(val) => handleChange('image', val)} keyboardType="url" autoCapitalize="none" />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Latitude</Text>
          <TextInput style={styles.input} value={formData.lat} onChangeText={(val) => handleChange('lat', val)} keyboardType="numeric" />
        </View>

        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Longitude</Text>
          <TextInput style={styles.input} value={formData.lng} onChangeText={(val) => handleChange('lng', val)} keyboardType="numeric" />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.submitBtn, { backgroundColor: COLORS.primary, marginBottom: 15 }]} 
        onPress={() => router.push(`/admin/dishes/${id}`)}
      >
        <Text style={styles.submitBtnText}>Manage Menu (Dishes)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.submitBtn, isSaving && styles.submitBtnDisabled]} 
        onPress={handleUpdate}
        disabled={isSaving}
      >
        {isSaving ? <ActivityIndicator color={COLORS.background} /> : <Text style={styles.submitBtnText}>Save Changes</Text>}
      </TouchableOpacity>
      
    </ScrollView>
  );
}