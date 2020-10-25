import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapContainer, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import pointMarkerIcon from '../../assets/point-marker.png';

export default function OrphanagesMapPage() {
  const navigation = useNavigation();
  return(
    <View style={styles.container}>
      <MapContainer
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -27.4663919,
          latitudeDelta: 0.009,
          longitude: -48.4484186,
          longitudeDelta: 0.009
        }}
      >
        <Marker
          icon={pointMarkerIcon}
          coordinate={{
            latitude: -27.4663919,
            longitude: -48.4484186
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
        >
          <Callout 
            tooltip
            onPress={() => navigation.navigate('details')}
          >
            <View style={styles.popUpContainer}>
              <Text style={styles.popUpText}>aaaa</Text>
            </View>
          </Callout>
        </Marker>
      </MapContainer>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>2 orphanages found</Text>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#FFF"/>
        </TouchableOpacity>
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