// app/view-location.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Import the component (Notice: no .web or .native extension)
import ClinicMap from '../components/ClinicMap';

export default function ViewLocationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse coordinates safely
  const latitude = parseFloat(params.latitude as string) || 14.6091;
  const longitude = parseFloat(params.longitude as string) || 121.0223;
  const name = (params.name as string) || 'Clinic';

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* The Map Component handles the platform switch automatically */}
      <ClinicMap 
        latitude={latitude} 
        longitude={longitude} 
        name={name} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backText: { fontWeight: 'bold' }
});