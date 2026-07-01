import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { authStyles as styles } from '../styles/auth.style'; 

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); // Reset previous errors

    // Client-side validation
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    console.log("TRYING TO FETCH:", `${process.env.EXPO_PUBLIC_API_URL}/users/login`);
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, password }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            setError(data.error || 'Invalid credentials.');
            return;
          }
    
          // Saving the token in a global variable
          global.token = data.token; 
          
          router.replace('/');
      
      // Switch to home screen
      router.replace('/'); 
    } catch (err) {
      console.log("Detailed error:", err);
      setError('Server error. Please try again.');
    }
  };


  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.title}>Login</Text>

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
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}