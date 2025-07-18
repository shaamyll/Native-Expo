import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useGetTransactions } from '../hooks/useTransactions'
import { ArrowDownLeft, ArrowUpRight } from 'phosphor-react-native';

const Wallet = () => {

   const { transactions } = useGetTransactions()

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

    const totalBalance = Math.max(totalIncome - totalExpense, 0);
  
  return (
    <View>
        <LinearGradient
              colors={['#7C3AED', '#4ADE80']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 12,
                padding: 24,
                marginLeft:18,
                marginRight: 18,
                marginTop: 10,
              }}
            >
              <Text className="text-white text-xl font-inter-semibold m-3 mx-auto">Total Balance</Text>
              <Text className="text-white text-5xl mt-1 mx-auto font-bold"> ₹{totalBalance.toFixed(2)}</Text>
      
      
              <View className="flex-row justify-between items-center mt-8">
                <View className="flex-row items-center gap-2">
                  <ArrowUpRight size={30} color="#22c55e" weight="bold" />
                  <View>
                    <Text className="text-white font-inter-semibold text-sm">Income</Text>
                    <Text className="text-white text-2xl font-inter-semibold">₹{totalIncome}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-2">
                  <ArrowDownLeft size={30} color="#ef4444" weight="bold" />
                  <View>
                    <Text className="text-white text-sm font-inter-semibold">Expense</Text>
                    <Text className="text-white text-2xl font-inter-semibold">₹{totalExpense}</Text>
                  </View>
                </View>
              </View>
      
            </LinearGradient>
    </View>
  )
}

export default Wallet