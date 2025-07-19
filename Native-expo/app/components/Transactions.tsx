import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGetTransactions } from '../hooks/useTransactions';
import {
  Hamburger,
  ShoppingCart,
  YoutubeLogo,
  DotsThreeOutline,
  CreditCard,
  CarProfile,
} from 'phosphor-react-native'
import { Link } from 'expo-router';

const Transactions = () => {

  const { transactions } = useGetTransactions()

  return (
    <View className="w-full p-5 flex-1">


      <View className="flex-row items-center justify-between px-4 mt-4">
        <View className='mb-3'>
          <Text className="text-secondary font-inter-semibold text-xl">
            Recent Transactions
          </Text>
          <Text className="text-gray-400 font-inter-semibold text-base">
            Track your Money..
          </Text>
        </View>

        <Link href={'/(tabs)/history'}>
        <TouchableOpacity className='text-secondary font-inter-semibold text-base'>
            View All
        </TouchableOpacity>
        </Link>
      </View>



      <View className="max-h-[500px]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {transactions.length > 0 ? (
            transactions.map((item) => (
              <View
                key={item.id}
                className="w-full bg-gray-900 p-4 mb-3 rounded-lg flex-row items-start gap-3"
              >
                {/* Icon with background */}
                <View
                  className={`p-3  rounded-lg ${item.category === 'Salary'
                    ? 'bg-green-500'
                    : item.category === 'Groceries'
                      ? 'bg-amber-500'
                      : item.category === 'Transport'
                        ? 'bg-blue-500'
                        : item.category === 'Food'
                          ? 'bg-pink-500'
                          : item.category === 'Subscriptions'
                            ? 'bg-indigo-500'
                            : 'bg-gray-500'
                    }`}
                >

                  {item.category === 'Salary' && <CreditCard size={32} weight="duotone" />}
                  {item.category === 'Groceries' && <ShoppingCart size={30} weight="duotone" color="#fff" />}
                  {item.category === 'Transport' && <CarProfile size={32} weight="duotone" />}
                  {item.category === 'Food' && <Hamburger size={30} weight="duotone" color="#fff" />}
                  {item.category === 'Subscriptions' && <YoutubeLogo size={30} weight="duotone" color="#fff" />}
                  {!['Salary', 'Groceries', 'Transport', 'Food', 'Subscriptions'].includes(item.category) && (
                    <DotsThreeOutline size={30} weight="duotone" color="#fff" />
                  )}
                </View>

                {/* Transaction Details */}
                <View className="flex-1 mt-1">
                  <View className="flex-row justify-between">
                    <Text className="text-secondary text-lg font-inter-semibold">{item.category}</Text>
                    <Text className="text-secondary text-lg font-inter-semibold">
                      {item.type === 'expense' ? `- ₹${item.amount}` : `₹${item.amount}`}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    {item?.note ? (
                      <Text className="text-gray-400 text-sm mt-1 font-inter-semibold">{item.note}</Text>
                    ) : null}
                    <Text className="text-gray-400 text-sm mt-1 font-inter-semibold">{item.date}</Text>

                  </View>
                </View>
              </View>

            ))
          ) : (
            <Text className="text-gray-500 text-center mt-10">
              No transactions yet
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default Transactions