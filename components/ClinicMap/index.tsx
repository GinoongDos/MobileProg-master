import React from 'react';
import { StyleSheet, View } from 'react-native';
import ClinicMap from '../../components/ClinicMap';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

export default function ClinicMap({ latitude, longitude, name }: Props) {
  return (
    <View style={styles.container}>
     <ClinicMap 
  latitude={14.6091} 
  longitude={121.0223} 
  name="Clinic Name" 
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});