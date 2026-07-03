import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../../styles/create.styles';

export default function CreateRestaurantScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State for restaurant details (exactly like the Web version)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    cuisineType: '',
    image: '',
    lat: '',
    lng: ''
  });

  // Helper function to cleanly update the state
  const handleChange = (field, value) => {
    setFormData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation before sending to the server
    if (!formData.name || !formData.lat || !formData.lng) {
      Alert.alert('Missing Fields', 'Name, Latitude, and Longitude are required.');
      return;
    }

    setIsLoading(true);

    try {
      const restRes = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lat: parseFloat(formData.lat), // Convert to number like in the Web version
          lng: parseFloat(formData.lng)  // Convert to number like in the Web version
        })
      });

      if (!restRes.ok) {
        const errorData = await restRes.json();
        Alert.alert('Error', errorData.error || errorData.message || 'Failed to add restaurant');
        setIsLoading(false);
        return;
      }

      Alert.alert('Success', 'Restaurant added successfully!');
      router.back();// Navigate back to the previous screen upon  - refresh the screen

    } catch (error) {
      console.error('Error submitting:', error);
      Alert.alert('Error', 'An error occurred while creating the restaurant.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Add New Restaurant</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Burger King"
          value={formData.name}
          onChangeText={(val) => handleChange('name', val)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Short description"
          value={formData.description}
          onChangeText={(val) => handleChange('description', val)}
          multiline
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street and City"
          value={formData.address}
          onChangeText={(val) => handleChange('address', val)}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="050-0000000"
            value={formData.phone}
            onChangeText={(val) => handleChange('phone', val)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Cuisine Type</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. burger"
            value={formData.cuisineType}
            onChangeText={(val) => handleChange('cuisineType', val)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          placeholder="https://..."
          value={formData.image}
          onChangeText={(val) => handleChange('image', val)}
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Latitude *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 32.1"
            value={formData.lat}
            onChangeText={(val) => handleChange('lat', val)}
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Longitude *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 34.8"
            value={formData.lng}
            onChangeText={(val) => handleChange('lng', val)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.submitBtn, isLoading && styles.submitBtnDisabled]} 
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitBtnText}>Create Restaurant</Text>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
}