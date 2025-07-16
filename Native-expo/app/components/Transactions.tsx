import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Transactions = () => {

    
      const transactions = [
        { id: 'txn_001', category: 'Others', amount: 1200, date: '2025-07-14' },
        { id: 'txn_002', category: 'Salary', amount: 5000, date: '2025-07-01' },
        { id: 'txn_003', category: 'Subscriptions', amount: 300, date: '2025-07-12' },
        { id: 'txn_004', category: 'Groceries', amount: 1200, date: '2025-07-14' },
        { id: 'txn_005', category: 'Salary', amount: 5000, date: '2025-07-01' },
        { id: 'txn_006', category: 'Transport', amount: 300, date: '2025-07-12' },
        { id: 'txn_007', category: 'Groceries', amount: 1200, date: '2025-07-14' },
        { id: 'txn_008', category: 'Salary', amount: 5000, date: '2025-07-01' },
        { id: 'txn_009', category: 'Transport', amount: 300, date: '2025-07-12' },
      ];
    
      
  return (
      <View className="w-full p-5 flex-1">
        <Text className="text-secondary font-inter-semibold text-xl mb-3">Transactions</Text>

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
                    <Ionicons
                      name={
                        item.category === 'Salary'
                          ? 'cash-outline'
                          : item.category === 'Groceries'
                            ? 'storefront-outline'
                            : item.category === 'Transport'
                              ? 'car-outline'
                              : item.category === 'Food'
                                ? 'restaurant-outline'
                                : item.category === 'Subscriptions'
                                  ? 'tv-outline'
                                  : 'albums-outline'
                      }
                      size={25}
                      color="#ffffff"
                    />
                  </View>

                  {/* Transaction Details */}
                  <View className="flex-1">
                    <View className="flex-row justify-between">
                      <Text className="text-secondary text-lg font-inter-semibold">{item.category}</Text>
                      <Text className="text-secondary text-lg font-inter-semibold">
                        ₹{item.amount}
                      </Text>
                    </View>
                    <Text className="text-gray-400 text-sm mt-1 font-inter-semibold">{item.date}</Text>
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