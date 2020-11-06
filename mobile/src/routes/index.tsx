import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrphanagesMapPage from '../pages/OrphanageMap';
import OrphanageDetailsPage from '../pages/OrphanageDetails';
import OrphanageDataMap from '../pages/OrphanageCreate/OrphanageDataMap';
import OrphanageData from '../pages/OrphanageCreate/OrphanageData';
import HeaderComponent from '../components/Header';

const { Navigator, Screen } = createStackNavigator();

export default function rootRoutes(props:any) {
 return(
  <NavigationContainer>
    <Navigator 
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#F2F3F5'
        }
      }}
    >
      <Screen 
        name="home" 
        component={OrphanagesMapPage}
        options={{
          
        }}
      />
      <Screen 
        name="details" 
        component={OrphanageDetailsPage}
        options={{
          headerShown: true,
          header: () => <HeaderComponent title="Orphanage" showBtnCancel={false} />
        }}
      />
      <Screen 
        name="create/map" 
        component={OrphanageDataMap}
        options={{
          headerShown: true,
          header: () => <HeaderComponent title="Create Orphanage" />
        }}
      />
      <Screen 
        name="create/data" 
        component={OrphanageData}
        options={{
          headerShown: true,
          header: () => <HeaderComponent title="Create Orphanage" />
        }}
      />
    </Navigator>
  </NavigationContainer>
 ); 
}