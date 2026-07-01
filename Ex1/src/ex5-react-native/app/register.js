import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { authStyles as styles } from '../styles/auth.style'; 

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [role, setRole] = useState('user'); 
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [address, setAddress] = useState('');

  const handleFileChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [Images],
        allowsEditing: true,
        quality: 1,
      });
    
      if (!result.canceled) {
        setPreviewUrl(result.assets[0].uri);
        setProfilePic(result.assets[0]);
      }
    };

  const handleSubmit = async () => {
    setError(''); // Reset previous errors

    // Client-side validation
    if (!username || !displayName || !password || !verifyPassword || !lat || !lng || !address) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must be at least 8 characters and include letters and numbers.');
      return;
    }
    if (password !== verifyPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              username, displayName, password, role, 
              lat: Number(lat), lng: Number(lng), address 
            }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            setError(data.error || 'Registration failed.');
            return;
          }
    
          router.replace('/login');
      
      router.replace('/login');
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Register</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Display Name"
        placeholderTextColor="#888"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <TextInput
        style={styles.input}
        placeholder="Password (min 8 chars, letters & numbers)"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={verifyPassword}
        onChangeText={setVerifyPassword}
        secureTextEntry
      />

    <TouchableOpacity style={styles.imageButton} onPress={handleFileChange}>
    {previewUrl ? (
        <Image source={{ uri: previewUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
    ) : (
        <Text style={styles.imageButtonText}>Upload Photo</Text>
    )}
    </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Latitude (e.g. 32.18)"
        placeholderTextColor="#888"
        value={lat}
        onChangeText={setLat}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude (e.g. 34.87)"
        placeholderTextColor="#888"
        value={lng}
        onChangeText={setLng}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#888"
        value={address}
        onChangeText={setAddress}
      />

      {/* Role Selection Toggle */}
      <View style={styles.roleContainer}>
        <TouchableOpacity 
          style={[styles.roleButton, role === 'user' && styles.roleActive]} 
          onPress={() => setRole('user')}
        >
          <Text style={[styles.roleText, role === 'user' && styles.roleTextActive]}>Regular User</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.roleButton, role === 'owner' && styles.roleActive]} 
          onPress={() => setRole('owner')}
        >
          <Text style={[styles.roleText, role === 'owner' && styles.roleTextActive]}>Restaurant Owner</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}