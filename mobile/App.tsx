import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold as Nunito600, Nunito_700Bold as Nunito700, Nunito_800ExtraBold as Nunito800 } from '@expo-google-fonts/nunito';
import RootNavigation from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito600,
    Nunito700,
    Nunito800
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <RootNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
