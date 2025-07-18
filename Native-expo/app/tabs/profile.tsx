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
import Wallet from '../components/wallet';
import { useProfile } from '../hooks/useProfile';
import Chart from '../components/chart';



const Profile = () => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('https://vanwinefest.ca/wp-content/uploads/bfi_thumb/profile-default-male-nyg4vc4i3m1d5pote7rfsv4o4c7p5ka5an0pselxcc-nyhjt6b1oifa23xq2ehfxoh9vink6vuxyns1y35vkc.png');

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
    <ScrollView className="flex-1 pt-20 px-6 bg-primary dark:bg-[#0f172a]">
      {/* Profile Image */}
      <View className="items-center ">
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
            source={{ uri: profilePic }}
            className="w-32 h-32 rounded-full mb-5"
          />

          <View className="absolute bottom-4 right-2 bg-gray-900 p-2 rounded-full shadow-md">
            <Ionicons name="add" size={15} color="#fff" />
          </View>
        </TouchableOpacity>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
          className="font-inter-bold text-2xl text-secondary  text-center"
          placeholderTextColor="gray"
        />

      </View>
        <Chart/>
        <View>

        </View>


    </ScrollView> 
  );
};

export default Profile;