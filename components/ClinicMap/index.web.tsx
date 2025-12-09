import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

const containerStyle = { width: '100%', height: '100%' };

export default function ClinicMap({ latitude, longitude, name }: Props) {
  const center = { lat: latitude, lng: longitude };

  return (
    <View style={styles.container}>
      {/* Remember to add your API Key below */}
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <Marker position={center} label={name} />
        </GoogleMap>
      </LoadScript>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});