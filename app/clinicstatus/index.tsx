import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// ✅ We import your new universal component
import ClinicMap from '../../components/ClinicMap';

export default function StatusScreen() {
  // You can replace these with real data later
  const clinicLocation = {
    latitude: 14.6091,
    longitude: 121.0223,
    name: "Carmen Clinic",
    address: "Carmen, Cagayan de Oro"
  };

  const currentTime = new Date().toLocaleTimeString();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Time Box */}
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>{currentTime}</Text>
      </View>

      <Text style={styles.title}>Clinic Status Map</Text>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        {/* ✅ The "Universal" map goes here */}
        <ClinicMap 
          latitude={clinicLocation.latitude} 
          longitude={clinicLocation.longitude} 
          name={clinicLocation.name} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  timeBox: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  timeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  mapContainer: {
    height: 400, // Giving the map a fixed height is important
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});