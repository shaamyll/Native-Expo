import {   Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Wallet from "../components/wallet";
import Transactions from "../components/Transactions";
import { useProfile } from "../hooks/useProfile";

export default function Index() {


  const {profile} = useProfile()




  return (
    <View className="flex-1 pt-20 bg-primary" >

      <View className="flex-row items-center px-6 mb-2">
        <Image
          source={{ uri: profile?.profilePic }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Text className="text-secondary font-inter-semibold text-xl">
          Hello {profile?.name || 'User'}
        </Text>
      </View>


      {/* Header  */}
      <Wallet/>

      {/* // Transactions*/}
    <Transactions/>


    </View>
  );
}
