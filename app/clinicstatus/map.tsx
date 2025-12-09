import React from 'react';
import { StyleSheet, View } from 'react-native';
// Import the "Smart" component we made earlier
// It automatically picks .web or .native for you
import ClinicMap from '../../components/ClinicMap';

export default function ClinicStatusMap() {
  // Example coordinates (or get these from your params/state)
  const latitude = 14.6091;
  const longitude = 121.0223;
  const name = "Clinic Location";

  return (
    <View style={styles.container}>
      <ClinicMap 
        latitude={latitude} 
        longitude={longitude} 
        name={name} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});