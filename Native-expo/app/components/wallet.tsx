import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const Wallet = () => {
  return (
    <View>
        <LinearGradient
              colors={['#7C3AED', '#4ADE80']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 12,
                padding: 24,
                margin: 24,
              }}
            >
              <Text className="text-white text-xl font-inter-semibold m-3 mx-auto">Total Balance</Text>
              <Text className="text-white text-5xl mt-1 mx-auto font-bold">$5,473.00</Text>
      
      
              <View className="flex-row justify-between items-center mt-8">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="arrow-up-circle-outline" size={28} color="#fff" />
                  <View>
                    <Text className="text-white font-inter-semibold text-sm">Income</Text>
                    <Text className="text-white text-base font-inter-semibold">$3,365.00</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="arrow-down-circle-outline" size={28} color="#fff" />
                  <View>
                    <Text className="text-white text-sm font-inter-semibold">Expense</Text>
                    <Text className="text-white text-base font-inter-semibold">$940.00</Text>
                  </View>
                </View>
              </View>
      
            </LinearGradient>
    </View>
  )
}

export default Wallet