import React, { useState } from 'react';
import * as Yup from 'yup';
import { createOrphanage } from '../../services/OrphanageService';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { Formik } from 'formik';

interface Params {
  position: {
    latitude:number;
    longitude:number;
  }
};

const validationSchema  = Yup.object().shape({
  name: Yup.string().required(),
  descriptions: Yup.string().required().max(300, 'Description must have max 300 caracters!'),
  instructions: Yup.string().required(),
  opening_hours: Yup.string().required(),
  open_on_weekend: Yup.boolean().required(),
});

export default function OrphanageData() {
  const navigaiton = useNavigation();
  const { position } = useRoute().params as Params;
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const initialState = {
    name: '',
    descriptions: '',
    instructions: '',
    opening_hours: '',
    open_on_weekend: false
  };

  async function handleLoadImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if(status !== 'granted') {
      alert("We need access your galery!");
      return;
    }
    const response = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (response.cancelled) return;

    const { uri } = response;
    setSelectedImages([...selectedImages, uri]);
  }

  async function handleCreateOrphanage(values:any) {
    const { latitude, longitude } = position;
    await createOrphanage({...values, latitude, longitude, images: selectedImages});
    navigaiton.navigate('home');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Formik
        initialValues={initialState}
        onSubmit={handleCreateOrphanage}
        validationSchema={validationSchema}
      >
        {({ handleBlur, handleChange, handleSubmit, values, setFieldValue }) => (
          <>
            <Text style={styles.title}>Data</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.inputContainer}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <Text style={styles.label}>Descriptions</Text>
            <TextInput
              style={[styles.inputContainer, { height: 110 }]}
              multiline
              onChangeText={handleChange('descriptions')}
              onBlur={handleBlur('descriptions')}
              value={values.descriptions}
            />
            {/* <Text style={styles.label}>Whatsapp</Text>
            <TextInput
              style={styles.inputContainer}
            /> */}
            <Text style={styles.label}>Pictures</Text>
            <View style={styles.selectedImagesContainer}>
              {selectedImages.map( imageUrl => (
                <Image 
                  key={imageUrl}
                  style={styles.selectedImages}
                  source={{ uri: imageUrl }}
                />
              ))}
            </View>
            <TouchableOpacity 
              style={styles.imagesInput} 
              onPress={handleLoadImages}
            >
              <Feather name="plus" size={24} color="#15B6D6" />
            </TouchableOpacity>
            <Text style={styles.title}>Visit</Text>
            <Text style={styles.label}>Instructions</Text>
            <TextInput
              style={[styles.inputContainer, { height: 110 }]}
              multiline
              onChangeText={handleChange('instructions')}
              onBlur={handleBlur('instructions')}
              value={values.instructions}
            />
            <Text style={styles.label}>Visiting hours</Text>
            <TextInput
              style={styles.inputContainer}
              onChangeText={handleChange('opening_hours')}
              onBlur={handleBlur('opening_hours')}
              value={values.opening_hours}
            />
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Attend on weekends?</Text>
              <Switch 
                thumbColor="#fff" 
                trackColor={{ false: '#ccc', true: '#39CC83' }}
                onValueChange={v => setFieldValue('open_on_weekend', v)}
                value={values.open_on_weekend}
              />
            </View>
            <RectButton style={styles.nextBtn} onPress={() => handleSubmit()}>
              <Text style={styles.nextBtnText}>Create</Text>
            </RectButton>
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito700',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },
  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito600',
    marginBottom: 8,
  },
  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  selectedImagesContainer: {
    flexDirection: "row",
  },
  selectedImages: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  nextBtn: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },
  nextBtnText: {
    fontFamily: 'Nunito800',
    fontSize: 16,
    color: '#FFF',
  }
})