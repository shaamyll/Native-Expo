import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');

  const categories = ['Salary', 'Transport', 'Clothes', 'Food', 'Others' , 'Groceries'];

  return (
    <ScrollView className="flex-1 bg-primary dark:bg-[#0f172a] px-6 pt-[120px]">
      <Text className="text-2xl font-inter-semibold text-secondary dark:text-white mb-3">Add Transaction</Text>

        <Text className=" text-gray-500 dark:text-gray-400 font-inter-semibold mb-4">
    Every rupee you save is a step closer to your goal.
  </Text>

      {/* Amount Input */}
      <View className="bg-gray-900  rounded-xl p-4 my-6">
        <Text className="text-gray-500 font-inter-semiboldmb-1" >Amount</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="₹0.00"
          placeholderTextColor="#94a3b8"
          value={amount}
          onChangeText={setAmount}
          className="text-2xl font-inter-semibold text-[#94a3b8]"
        />
      </View>

      {/* Transaction Type Toggle */}
      <View className="flex-row gap-3 mb-9 space-x-4">
        <TouchableOpacity
          onPress={() => setType('income')}
          className={`flex-1 p-3 rounded-xl items-center ${
            type === 'income' ? 'bg-green-500' : 'bg-white dark:bg-gray-800'
          }`}
        >
          <Text className={`font-medium ${type === 'income' ? 'text-white' : 'text-gray-700 dark:text-white'}`}>
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setType('expense')}
          className={`flex-1 p-3 rounded-xl items-center ${
            type === 'expense' ? 'bg-red-500' : 'bg-white dark:bg-gray-800'
          }`}
        >
          <Text className={`font-medium ${type === 'expense' ? 'text-white' : 'text-gray-700 dark:text-white'}`}>
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Selection */}
      <View className="mb-4">
  <Text className="text-gray-500 font-inter-semibold mb-6">Category</Text>
  <View className="flex-row flex-wrap gap-4">
    {categories.map((item) => (
      <TouchableOpacity
        key={item}
        onPress={() => setCategory(item)}
        className={`px-4 py-2 rounded-lg border  ${
          category === item
            ? 'bg-purple-300 border-purple-600'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <Text
          className={`${
            category === item ? 'text-primary' : 'text-gray-700 dark:text-white'
          } font-medium`}
        >
          {item}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</View>


      {/* Note Input */}
      <View className="bg-gray-900  rounded-xl p-4 my-6">
        <Text className="text-gray-500 font-inter-semibold mb-1">Note (optional)</Text>
        <TextInput
          placeholder="E.g., bought groceries"
          placeholderTextColor="#94a3b8"
          value={note}
          onChangeText={setNote}
          className="text-gray-900 font-inter-semibold"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-purple-300 p-4 rounded-xl items-center">
        <Text className="text-primary font-inter-bold text-lg">Add Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddTransaction;
