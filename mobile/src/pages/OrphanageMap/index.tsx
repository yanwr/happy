import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loadAllOrphanages } from '../../services/OrphanageService';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapContainer, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import pointMarkerIcon from '../../assets/point-marker.png';
import { Orphanage } from '../../models';

export default function OrphanagesMapPage() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Array<Orphanage>>([]);

  useEffect(() => {
    loadAllOrphanages()
      .then(res => setOrphanages(res))
      .catch(() => setOrphanages([]));
  }, []);

  function renderOrphanages() {
    return orphanages.map( orphanage => (
      <Marker
        key={orphanage.id}
        icon={pointMarkerIcon}
        coordinate={{
          latitude: orphanage.latitude,
          longitude: orphanage.longitude
        }}
        calloutAnchor={{
          x: 2.7,
          y: 0.8
        }}
      >
        <Callout 
          tooltip
          onPress={() => navigation.navigate('details', { id: orphanage.id })}
        >
          <View style={styles.popUpContainer}>
            <Text style={styles.popUpText}>{orphanage.name}</Text>
          </View>
        </Callout>
      </Marker>
    ))
  }
  
  return(
    <View style={styles.container}>
      <MapContainer
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -27.4671131,
          latitudeDelta: 0.25,
          longitude: -48.4750216,
          longitudeDelta: 0.25
        }}
      > 
        { renderOrphanages() } 
      </MapContainer>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>{orphanages.length} orphanages found</Text>
        <RectButton
          style={styles.btnContainer}
          onPress={() => navigation.navigate('create/map')}
        >
          <Feather name="plus" size={20} color="#FFF"/>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  popUpContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    justifyContent: "center",
  },
  popUpText: {
    color: "#0089a5",
    fontSize: 14,
    fontFamily: "Nunito700"
  },
  footerContainer: {
    position: "absolute",
    left: 24,
    bottom: 32,
    right: 24,
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  footerText: {
    color: "#8FA7B3",
    fontFamily: "Nunito700"
  },
  btnContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#15C4D6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  }
});