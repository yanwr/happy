import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

interface Props {
  title: string;
  showBtnCancel?: boolean;
};

const HeaderComponent: React.FC<Props> = ({ title, showBtnCancel = true }) => {
  const navigation = useNavigation();
  return(
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15C6D6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      { showBtnCancel ? <BorderlessButton onPress={() => navigation.navigate('home')}>
        <Feather name="x" size={24} color="#FF669D" />
      </BorderlessButton> : <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 44,
    backgroundColor: '#F9FAFC',
    borderBottomWidth: 1,
    borderColor: '#DDE3F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Nunito600',
    color: '#8FA7B3',
    fontSize: 16
  }
});

export default HeaderComponent;