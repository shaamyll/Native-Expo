import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'

const Search = () => {
  return (
    <View className='flex-1 bg-primary pt-20'>
      <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRElcIZ13j4ZW8CaaSW1pwujpOXD2Yqd7SSLg&s' }} className='w-20 h-20 mx-auto ' resizeMode='contain' />
      <View className=' px-5'>
        <SearchBar />
      </View>

      <ScrollView className=' px-5' showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10  }}>
        <Text className='text-white text-base leading-relaxed'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam exercitationem dolorem maiores commodi reprehenderit nemo autem explicabo error, nobis necessitatibus atque quisquam voluptatem pariatur suscipit? Sapiente dolorum adipisci nobis consequuntur.
          
        </Text>
      </ScrollView>
    </View>
  )
}

export default Search