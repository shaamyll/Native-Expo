import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

const SearchBar = () => {
  return (
    <View className='flex-row items-center px-5 py-4'>
      <Ionicons name="search-outline" size={24} color="white" />
      <TextInput placeholder='Search' placeholderTextColor="white" className='ms-1 text-lg'/>
    </View>
  )
}

export default SearchBar