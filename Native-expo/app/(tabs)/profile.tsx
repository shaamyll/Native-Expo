import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Text
} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../hooks/useProfile';
import Chart from '../components/DonutChart';

const Profile = () => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  //useProfile Hook
  const { profile, updateProfile } = useProfile();

  //  set initial state from profile
  useEffect(() => {
    if (profile?.name !== undefined) {
      setName(profile.name);
      setProfilePic(profile.profilePic);
    }
  }, [profile]);


  // Update profile
  useEffect(() => {
    updateProfile({ name, profilePic });
  }, [name, profilePic]);


  // Camera capture
  const capturePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Camera access denied');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // Gallery picker
  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Gallery access denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <ScrollView className="flex-1 pt-20 px-6 bg-primary ">

   <View className="flex-row items-center justify-center mb-10 space-x-3">
                <Image
                  source={require('../../assets/images/logo.png')}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
                <Text className="text-white text-xl font-inter-bold">Track It</Text>
              </View>


      {/* Profile Image */}
      <View className="items-center mt-5 ">
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Update Photo', 'Choose an option', [
              { text: 'Camera', onPress: capturePhoto },
              { text: 'Gallery', onPress: pickFromGallery },
              { text: 'Cancel', style: 'cancel' },
            ])
          }
          className="relative"
        >
          <Image
  source={
    profilePic
      ? { uri: profilePic }
      : require('../../assets/images/profile.png')
  }
  className="w-36 h-36 rounded-full mb-5"
/>

          <View className="absolute bottom-4 right-2 bg-gray-900 p-2 rounded-full shadow-md">
            <Ionicons name="add" size={15} color="#fff" />
          </View>
        </TouchableOpacity>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Your Name"
          className="font-inter-bold text-2xl text-secondary  text-center"
          placeholderTextColor="gray"
        />

      </View>

      <View>
        <Text className="text-secondary font-inter-semibold text-center text-lg mt-6 mb-2">Track your Expenses</Text>
        <Chart />
      </View>


    </ScrollView>
  );
};

export default Profile;