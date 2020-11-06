import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import pointMarkerIcon from '../../assets/point-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleSelectMapPosition(e: MapEvent) {
    setPosition(e.nativeEvent.coordinate);
  }

  function existPositionSelected() {
    return ( position.latitude && position.longitude ) !== 0;
  }

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: -27.4671131,
          longitude: -48.4750216,
          latitudeDelta: 0.13,
          longitudeDelta: 0.13,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        { existPositionSelected() && <Marker 
            icon={pointMarkerIcon}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        }
      </MapView>
      { existPositionSelected() && (
          <RectButton 
            style={styles.nextButton} 
            onPress={() => navigation.navigate('create/data', {position})}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </RectButton>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },
  nextButtonText: {
    fontFamily: 'Nunito800',
    fontSize: 16,
    color: '#FFF',
  }
});