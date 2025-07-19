import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import { useDeleteTransaction, useGetTransactions } from '../hooks/useTransactions';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Hamburger,
  ShoppingCart,
  YoutubeLogo,
  DotsThreeOutline,
  CreditCard,
  CarProfile,
  Tag,
  Tote,
  TShirt,
} from 'phosphor-react-native';
import { Swipeable } from 'react-native-gesture-handler';
import EditTransactionModal from '../components/EditTransactionModal';


type Transaction = {
  id: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  note?: string;
};

const history = () => {
  const { transactions, isLoading } = useGetTransactions();

  const [filter, setFilter] = useState<string>('');
  const [openFilters, setOpenFilters] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState('');
  const [openMonth, setOpenMonth] = useState(false);

  const [monthItems, setMonthItems] = useState([
    { label: 'All Months', value: 'All' },
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

  const [filterItems, setFilterItems] = useState([
    { label: 'All', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Groceries', value: 'Groceries' },
    { label: 'Salary', value: 'Salary' },
    { label: 'Subscriptions', value: 'Subscriptions' },
  ]);

  const filteredTransactions = React.useMemo(() => {
    let result: Transaction[] = [...transactions];

    if (selectedMonth && selectedMonth !== 'All') {
      result = result.filter(item => {
        const parts = item.date?.trim().split(' ');
        if (!parts || parts.length < 1) return false;
        return parts[0] === selectedMonth;
      });
    }

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


  //Delete
  const [showModal, setShowModal] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(null);

  const { deleteTransaction } = useDeleteTransaction();

  const handleConfirmDelete = () => {
    if (deleteTransactionId) {
      deleteTransaction(deleteTransactionId);
      setShowModal(false);
      setDeleteTransactionId(null);
    }
  };


  //Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };


  return (
    <View className="bg-primary flex-1 pt-20">

      <View className="flex-row items-center justify-center mb-5 space-x-3">
        <Image
          source={require('../../assets/images/logo.png')}
          className="w-10 h-10"
          resizeMode="contain"
        />
        <Text className="text-white text-xl font-inter-bold">Track It</Text>
      </View>


      <View className="w-full px-5 mt-3">
        <Text className="text-secondary font-inter-semibold text-xl">History..</Text>

        <Text className="text-gray-400 font-inter-semibold text-base mb-3">
          Swipe left to Edit Entries & Long Press to Delete
        </Text>

        <View className="flex-row justify-between mb-4">
          <View className="flex-1 mr-2 bg-[#1e1e1e] rounded-md">
            <DropDownPicker
              placeholder="Select a Filter"
              open={openFilters}
              value={filter}
              items={filterItems}
              setOpen={setOpenFilters}
              setValue={setFilter}
              setItems={setFilterItems}
              style={{ backgroundColor: '#1e1e1e', borderRadius: 10 }}
              textStyle={{ color: 'white', fontFamily: 'InterSemiBold' }}
              dropDownContainerStyle={{ backgroundColor: '#2e2e2e' }}
            />
          </View>

          <View className="flex-1 ml-2 bg-[#1e1e1e] rounded-md">
            <DropDownPicker
              placeholder="Select a Month"
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

        {isLoading ? (
          <View className="flex-1 justify-center items-center mt-20">
            <ActivityIndicator size="large" color="#ffffff" />
            <Text className="text-secondary mt-4">Loading transactions...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTransactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const renderRightActions = () => (
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  className="bg-blue-600 justify-center items-center w-20 h-[77px]   rounded-md"
                >
                  <Text className="text-white font-bold">Edit</Text>
                </TouchableOpacity>
              );

              return (
                <TouchableOpacity
                  onLongPress={() => {
                    setDeleteTransactionId(item.id);
                    setShowModal(true);
                  }}
                >
                  <Swipeable renderRightActions={renderRightActions}>
                    <View className="w-full bg-gray-900 p-4 mb-3 rounded-md flex-row items-start gap-4">
                      <View
                        className={`p-3 rounded-lg ${item.category === 'Salary'
                          ? 'bg-green-500'
                          : item.category === 'Groceries'
                            ? 'bg-amber-500'
                            : item.category === 'Transport'
                              ? 'bg-blue-500'
                              : item.category === 'Food'
                                ? 'bg-pink-500'
                                : item.category === 'Subscriptions'
                                  ? 'bg-indigo-500'
                                  : item.category === 'Clothes'
                                    ? 'bg-violet-500'
                                    : item.category === 'Others' ? 'bg-orange-500' : ''}`}
                      >
                        {item.category === 'Salary' && <CreditCard size={30} weight="duotone" />}
                        {item.category === 'Groceries' && <ShoppingCart size={30} weight="duotone" color="#fff" />}
                        {item.category === 'Transport' && <CarProfile size={30} weight="duotone" />}
                        {item.category === 'Food' && <Hamburger size={30} weight="duotone" color="#fff" />}
                        {item.category === 'Clothes' && <TShirt size={30} weight="duotone" color="#fff" />}
                        {item.category === 'Subscriptions' && <YoutubeLogo size={30} weight="duotone" color="#fff" />}
                        {item.category === 'Others' && <DotsThreeOutline size={30} weight="duotone" color="#fff" />}

                      </View>

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
                  </Swipeable>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text className="text-gray-500 text-center mt-10">No transactions yet</Text>
            }
          />
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-[80%] items-center">
            <Text className="text-lg font-bold text-black mb-4">Delete Transaction?</Text>
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={handleConfirmDelete}
                className="bg-red-500 px-4 py-2 rounded-md"
              >
                <Text className="text-white">Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                <Text className="text-black">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <EditTransactionModal
        visible={showEditModal}
        transaction={selectedTransaction}
        onClose={() => setShowEditModal(false)}
      />
    </View>
  );
};

export default history;
