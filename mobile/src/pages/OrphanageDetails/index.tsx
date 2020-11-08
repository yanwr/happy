import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import pointMarkerIcon from '../../assets/point-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { loadOneOrphanages } from '../../services/OrphanageService';
import { Orphanage } from '../../models';

interface Params {
  id:number;
}

export default function OrphanageDetailsPage() {
  const params = useRoute().params as Params;
  const [orphanage, setOrphange] = useState<Orphanage>();

  useEffect(() => {
    loadOneOrphanages(params.id)
      .then(res => setOrphange(res));
  }, [params.id]);

  
  if (!orphanage) {
    return <View><Text>Loading ...</Text></View>
  }
  
  function renderOrphanagesImages() {
    console.log(orphanage);
    return orphanage?.images.map( x => (
      <Image key={x.id} style={styles.image} source={{ uri: x.url }} />
    ))
  }

  function openGoogleRoutes() {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {renderOrphanagesImages()}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.descriptions}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.0014,
              longitudeDelta: 0.0014,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={pointMarkerIcon}
              coordinate={{ 
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            />
          </MapView>

          <TouchableOpacity style={styles.routesContainer} onPress={openGoogleRoutes}>
            <Text style={styles.routesText}>Go to Google Maps</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instructions to visities</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Monday to Friday {orphanage.opening_hours}</Text>
          </View>
          { orphanage.open_on_weekend ? <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Attend on weekends</Text>
            </View>
            : <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>No attend on weekends</Text>
            </View>
          }
        </View>

        <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Call me</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesContainer: {
    height: 240,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 24,
  },
  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito700',
  },
  description: {
    fontFamily: 'Nunito600',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },
  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },
  mapStyle: {
    width: '100%',
    height: 150,
  },
  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routesText: {
    fontFamily: 'Nunito700',
    color: '#0089a5'
  },
  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },
  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scheduleItem: {
    width: '48%',
    padding: 20,
  },
  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },
  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },
  scheduleItemRed: {
    backgroundColor: '#FEF6F9',
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },
  scheduleText: {
    fontFamily: 'Nunito600',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },
  scheduleTextBlue: {
    color: '#5C8599'
  },
  scheduleTextGreen: {
    color: '#37C77F'
  },
  scheduleTextRed: {
    color: '#FF669D'
  },
  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },
  contactButtonText: {
    fontFamily: 'Nunito800',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})