// PatientProfile.tsx
import api from '@/hooks/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type UserProfile = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
};

export default function PatientProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load profile from AsyncStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const email = await AsyncStorage.getItem('loggedInEmail');
      if (!email) return;

      const savedUser = await AsyncStorage.getItem(`user:${email}`);
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    loadUser();
  }, []);

  // Fetch latest profile from backend
  const onGetProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        Alert.alert('Error', 'No auth token found. Please login first.');
        return;
      }

      const response = await api.get('auth/user/me/', {
        headers: { Authorization: 'Token ' + token },
      });

      // Map backend fields to frontend
      const userProfile: UserProfile = {
        firstName: response.data.first_name || '',
        middleName: response.data.middle_name || '',
        lastName: response.data.last_name || '',
        email: response.data.email || '',
      };

      setUser(userProfile);
      await AsyncStorage.setItem(`user:${userProfile.email}`, JSON.stringify(userProfile));
      await AsyncStorage.setItem('loggedInEmail', userProfile.email);

      Alert.alert('Success', 'Profile updated!');
    } catch (error: any) {
      console.log('Fetch profile error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to fetch profile.');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.getProfileButton} onPress={onGetProfile}>
        <Text style={styles.getProfileText}>Get Profile</Text>
      </TouchableOpacity>

      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.infoText}>{user.firstName}</Text>

      <Text style={styles.label}>Middle Name:</Text>
      <Text style={styles.infoText}>{user.middleName || '-'}</Text>

      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.infoText}>{user.lastName}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.infoText}>{user.email}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F0F0F0' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15 },
  infoText: { fontSize: 18, marginTop: 5, color: '#333' },
  getProfileButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  getProfileText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
