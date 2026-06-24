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

    try {
      // Future network request (Task AE-192)
      /*
      const response = await fetch('http://localhost:3000/api/users', { ... });
      */
      
      // Switch to home screen
      router.replace('/'); 
    } catch (err) {
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
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
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