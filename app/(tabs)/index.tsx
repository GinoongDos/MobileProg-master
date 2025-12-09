import api from '@/hooks/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [data, setData] = useState({ id_number: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Fetch profile using token
  const fetchProfile = async (token?: string) => {
    try {
      const t = token || (await AsyncStorage.getItem('auth_token'));
      if (!t) throw new Error('No token found');

      const response = await api.get('auth/user/me/', {
        headers: { Authorization: 'Token ' + t }
      });

      // Map snake_case to camelCase
      const userData = {
        firstName: response.data.first_name || '',
        middleName: response.data.middle_name || '',
        lastName: response.data.last_name || '',
        email: response.data.email || ''
      };

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('Profile fetched:', userData);
      Alert.alert('Success', 'Profile fetched successfully!');
    } catch (error: any) {
      console.log('Fetch profile error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to fetch profile.');
    }
  };

  const onPressLogin = async () => {
    if (!data.id_number || !data.password) {
      Alert.alert('Error', 'Please enter ID number and password');
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Login and get token
      const response = await api.post('auth/token/login/', data); 
      const token = response.data.auth_token;
      if (!token) throw new Error('Invalid credentials');

      await AsyncStorage.setItem('auth_token', token);

      // 2️⃣ Fetch profile
      await fetchProfile(token);

      // 3️⃣ Redirect to dashboard
      router.push('/patient-dashboard');
    } catch (error: any) {
      console.log('Login error:', error.response?.data || error.message);
      Alert.alert('Error', 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => router.push('/register');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/medical.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Welcome to Meditech</Text>

      <TextInput
        style={styles.input}
        placeholder="ID Number"
        placeholderTextColor="#aaa"
        value={data.id_number}
        onChangeText={(text) => setData({ ...data, id_number: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={data.password}
        onChangeText={(text) => setData({ ...data, password: text })}
      />

      <TouchableOpacity
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={onPressLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>LOGIN</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerLink} onPress={goToRegister}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => fetchProfile()}
      >
        <Text style={styles.profileButtonText}>Get Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#D9D9D9' },
  logoContainer: { marginBottom: 30 },
  logo: { width: 180, height: 150, resizeMode: 'contain' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15 },
  loginButton: { width: '100%', backgroundColor: '#D95A58', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  loginText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerLink: { marginTop: 15, marginBottom: 15 },
  registerText: { color: '#D95A58', fontSize: 16, textDecorationLine: 'underline' },
  profileButton: { width: '100%', backgroundColor: '#4CAF50', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  profileButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
