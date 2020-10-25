import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrphanagesMapPage from '../pages/OrphanageMap';
import OrphanageDetailsPage from '../pages/OrphanageDetails';

const { Navigator, Screen } = createStackNavigator();

export default function rootRoutes(props:any) {
 return(
  <NavigationContainer>
    <Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="home" component={OrphanagesMapPage} />
      <Screen name="details" component={OrphanageDetailsPage} />
    </Navigator>
  </NavigationContainer>
 ); 
}