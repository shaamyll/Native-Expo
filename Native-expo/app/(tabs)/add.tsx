import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Image } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { useAddTransaction } from '../hooks/useTransactions';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import Toast from 'react-native-toast-message';


const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  //date
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };
  const formatDate = (d: Date) => dayjs(d).format('MMM D YYYY');

  //Categories
  const categories = ['Salary', 'Transport', 'Clothes', 'Food', 'Others', 'Groceries'];


  //Add transaction function
  const { addTransaction } = useAddTransaction();

  const handleAddTransaction = async () => {
    if (!amount) {
      Toast.show({
        type: 'error',
        text1: 'Missing amount!',
        text2: 'Please enter an amount to continue.',
      });
    }
    else {
      await addTransaction({
        id: uuidv4() as string,
        amount: parseFloat(amount),
        type,
        category,
        note,
        date: formatDate(date),
      });

      //  reset inputs
      setAmount('');
      setNote('');
      setCategory('Food');
      setDate(new Date());
      setType('expense');
    }

  }


  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >

      <ScrollView className="flex-1 bg-primary px-6 pt-20"
        contentContainerStyle={{ paddingBottom: 200 }}
        keyboardShouldPersistTaps="handled"
      >


        <View className="flex-row items-center justify-center mb-5 space-x-3">
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <Text className="text-white text-xl font-inter-bold">Track It</Text>
        </View>



        <Text className="text-2xl font-inter-semibold text-secondary dark:text-white mb-3">Add Transaction</Text>

        <Text className=" text-gray-500 dark:text-gray-400 font-inter-semibold mb-4">
          Every rupee you save is a step closer to your goal.
        </Text>

        {/* Amount Input */}
        <View className="bg-gray-900  rounded-xl p-4 mb-5">
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
        <View className="flex-row gap-3 mb-4 space-x-4">
          <TouchableOpacity
            onPress={() => {
              setType('income');
              setCategory('Salary');
            }}
            className={`flex-1 p-3 rounded-xl items-center ${type === 'income' ? 'bg-green-500' : 'bg-white dark:bg-gray-800'
              }`}
          >
            <Text className={`font-medium ${type === 'income' ? 'text-white' : 'text-gray-700 dark:text-white'}`}>
              Income
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setType('expense')
              setCategory('Food');
            }}
            className={`flex-1 p-3 rounded-xl items-center ${type === 'expense' ? 'bg-red-500' : 'bg-white dark:bg-gray-800'
              }`}
          >
            <Text className={`font-medium ${type === 'expense' ? 'text-white' : 'text-gray-700 dark:text-white'}`}>
              Expense
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Selection */}
        <View className="mb-4">
          <Text className="text-gray-500 font-inter-semibold mb-2">Category</Text>
          <View className="flex-row flex-wrap gap-4">
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setCategory(item)}
                className={`px-4 py-2 rounded-lg border  ${category === item
                  ? 'bg-purple-300 border-purple-600'
                  : 'border-gray-300 dark:border-gray-600'
                  }`}
              >
                <Text
                  className={`${category === item ? 'text-primary' : 'text-gray-700 dark:text-white'
                    } font-medium`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date Picker */}
        <View className="mb-4">
          <Text className="text-gray-500 font-inter-semibold mb-2">Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-gray-900 rounded-xl p-4"
          >
            <Text className="text-white">{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date(2100, 11, 31)}
              minimumDate={new Date(2000, 0, 1)}
            />
          )}
        </View>


        {/* Note Input */}
        <View className="bg-gray-900  rounded-xl p-4 mb-6">
          <Text className="text-gray-500 font-inter-semibold mb-1">Note (optional)</Text>
          <TextInput
            placeholder="E.g., bought groceries"
            placeholderTextColor="#94a3b8"
            value={note}
            onChangeText={setNote}
            className="text-[#94a3b8] text-lg font-inter-semibold"
          />
        </View>

        <TouchableOpacity className="bg-purple-300 p-4 rounded-xl items-center" onPress={handleAddTransaction}>
          <Text className="text-primary font-inter-bold text-lg" >Add Transaction</Text>
        </TouchableOpacity>
      </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default AddTransaction;
