import {   Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import Wallet from "../components/wallet";
import Transactions from "../components/Transactions";
import { useProfile } from "../hooks/useProfile";

export default function Index() {

  const {profile} = useProfile()

  return (
    <View className="flex-1 pt-20 bg-primary" >

       <View className="flex-row items-center justify-center mb-5 space-x-3">
                <Image
                  source={require('../../assets/images/logo.png')}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="text-white text-xl font-inter-bold">Track It</Text>
              </View>


      <View className="flex-row items-center px-6 mb-2">
      {
        profile?.profilePic && (  <Image
          source={{ uri: profile?.profilePic }}
          className="w-8 h-8 rounded-full mr-3"
        />)
      }
        <Text className="text-secondary font-inter-semibold text-xl">
          {
            profile?.name?`Hello ${profile?.name}`:"Welcome!"
          }
        </Text>
      </View>


      {/* Header  */}
      <Wallet/>

      {/* // Transactions*/}
    <Transactions/>


    </View>
  );
}
