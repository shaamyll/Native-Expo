import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useTransactions } from '../hooks/useTransactions';
//native picker for filtering transactions
import { Picker } from '@react-native-picker/picker';
//DropDownPicker for month selection
import DropDownPicker from 'react-native-dropdown-picker';


type Transaction = {
  id: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
};

const history = () => {

  const { transactions } = useTransactions();

  const [filter, setFilter] = useState<string>('all');


  //Month filter
  const [selectedMonth, setSelectedMonth] = useState('');
  const [openMonth, setOpenMonth] = useState(false);

  const [monthItems, setMonthItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'Jan', value: 'Jan' },
    { label: 'Feb', value: 'Feb' },
    { label: 'Mar', value: 'Mar' },
    { label: 'Apr', value: 'Apr' },
    { label: 'May', value: 'May' },
    { label: 'Jun', value: 'Jun' },
    { label: 'Jul', value: 'Jul' },
    { label: 'Aug', value: 'Aug' },
    { label: 'Sep', value: 'Sep' },
    { label: 'Oct', value: 'Oct' },
    { label: 'Nov', value: 'Nov' },
    { label: 'Dec', value: 'Dec' },
  ]);




  //All filters to map
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Groceries', value: 'Groceries' },
    { label: 'Salary', value: 'Salary' },
    { label: 'Subscriptions', value: 'Subscriptions' },
  ];

  const filteredTransactions = React.useMemo(() => {
    let result: Transaction[] = [...transactions];


    //Filtyer by month
    if (selectedMonth && selectedMonth !== 'All') {
      result = result.filter(item => {
        const parts = item.date?.trim().split(' ');
        if (!parts || parts.length < 1) return false;
        return parts[0] === selectedMonth;
      });
    }

    // ✅ Filter by category or type
    if (filter === 'income') {
      result = result.filter(item => item.type === 'income');
    } else if (filter === 'expense') {
      result = result.filter(item => item.type === 'expense');
    } else if (
      ['Food', 'Transport', 'Groceries', 'Salary', 'Subscriptions'].includes(filter)
    ) {
      result = result.filter(item => item.category === filter);
    }

    return result;
  }, [transactions, filter, selectedMonth]);



  return (
    <View className='bg-primary flex-1 pt-20'>

      <View className="w-full p-5">
        <Text className="text-secondary font-inter-semibold text-xl mb-3">Transactions</Text>

        {/* Filter Pickers */}
        <View className="flex-row justify-between mb-4">
          {/* Main Filter Picker */}
          <View className="flex-1 mr-2 bg-[#1e1e1e] rounded-md">
            <Picker
              selectedValue={filter}
              onValueChange={(value) => setFilter(value)}
              style={{ color: 'white' }}
            >
              {filters.map((item) => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          </View>

          {/* Month Filter Picker */}
          <View className="flex-1 ml-2 bg-[#1e1e1e] rounded-md">
            <DropDownPicker
            placeholder='Select a Month'
              open={openMonth}
              value={selectedMonth}
              items={monthItems}
              setOpen={setOpenMonth}
              setValue={setSelectedMonth}
              setItems={setMonthItems}
              style={{ backgroundColor: '#1e1e1e', borderRadius: 10 }}
              textStyle={{ color: 'white', fontFamily: 'InterSemiBold' }}
              dropDownContainerStyle={{ backgroundColor: '#2e2e2e' }}
            />
          </View>

        </View>


        <FlatList
          data={filteredTransactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="w-full bg-gray-900 p-4 mb-3 rounded-md flex-row items-start gap-4">
              {/* Icon Container */}
              <View
                className={`p-3 rounded-lg ${item.category === 'Salary' ? 'bg-green-500' :
                  item.category === 'Groceries' ? 'bg-amber-500' :
                    item.category === 'Transport' ? 'bg-blue-500' :
                      item.category === 'Food' ? 'bg-pink-500' :
                        item.category === 'Subscriptions' ? 'bg-indigo-500' :
                          'bg-gray-500'
                  }`}
              >
                <Ionicons
                  name={
                    item.category === 'Salary' ? 'cash-outline' :
                      item.category === 'Groceries' ? 'storefront-outline' :
                        item.category === 'Transport' ? 'car-outline' :
                          item.category === 'Food' ? 'restaurant-outline' :
                            item.category === 'Subscriptions' ? 'tv-outline' :
                              'albums-outline'
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
                    {item.type === 'expense' ? `- ₹${item.amount}` : `₹${item.amount}`}
                  </Text>
                </View>
                <Text className="text-gray-400 text-sm mt-1 font-inter-semibold">{item.date}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-gray-500 text-center mt-10">
              No transactions yet
            </Text>
          }
        />

      </View>

    </View>
  )
}

export default history