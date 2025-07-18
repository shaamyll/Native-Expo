import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import { useEditTransaction } from '../hooks/useTransactions';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';

const categories = ['Salary', 'Transport', 'Clothes', 'Food', 'Others', 'Groceries'];

const EditTransactionModal = ({ visible, onClose, transaction }: any) => {
    const { editTransaction } = useEditTransaction();

    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [category, setCategory] = useState('Food');
    const [note, setNote] = useState('');

    const [date, setDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (_: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    const formatDate = (d: Date) => dayjs(d).format('MMM D YYYY');

    useEffect(() => {
        if (transaction) {
            setAmount(transaction.amount.toString());
            setType(transaction.type);
            setCategory(transaction.category);
            setNote(transaction.note || '');
            const parsedDate = dayjs(transaction.date, 'MMM D YYYY');
            setDate(parsedDate.isValid() ? parsedDate.toDate() : new Date());
            console.log('Transaction loaded:', transaction);
        }
    }, [transaction]);

    const handleSave = () => {
        editTransaction({
            ...transaction,
            amount: Number(amount),
            type,
            category,
            note,
            date,
        });
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 justify-center items-center bg-black/60">
                <View className="bg-white w-[90%] p-4 rounded-lg max-h-[85%]">
                    <Text className="text-xl font-inter-semibold mb-4 text-center">Edit Transaction</Text>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder="Amount"
                            className="border border-gray-300 p-2 rounded mb-4 font-inter-semibold"
                        />

                        <View className="flex-row mb-4">
                            {['income', 'expense'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => setType(option as 'income' | 'expense')}
                                    className={`px-4 py-2 rounded mr-2 ${type === option ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    <Text className="text-white capitalize font-inter-semibold">{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text className="mb-2 text-gray-700 font-inter-semibold">Category</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => setCategory(cat)}
                                    className={`px-3 py-1 rounded-full mr-2 ${category === cat ? 'bg-purple-600' : 'bg-gray-200'}`}
                                >
                                    <Text className={`text-sm font-inter-semibold ${category === cat ? 'text-white' : 'text-black'}`}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TextInput
                            value={note}
                            onChangeText={setNote}
                            placeholder="Note (optional)"
                            className="border border-gray-300 p-2 rounded mb-4 font-inter-semibold"
                        />

                        <View className="mb-5">
                            <Text className="text-gray-500 font-inter-semibold mb-2">Date</Text>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="border border-gray-300 rounded-xl p-4"
                            >
                                <Text className="text-gray-900 font-inter-semibold">
                                    {date ? formatDate(date) : 'Select a date'}
                                </Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date || new Date()}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={handleDateChange}
                                    maximumDate={new Date(2100, 11, 31)}
                                    minimumDate={new Date(2000, 0, 1)}
                                    textColor="#000000"
                                />
                            )}
                        </View>

                        <View className="flex-row justify-end gap-3 mt-2">
                            <TouchableOpacity onPress={onClose} className="bg-gray-400 px-4 py-2 rounded">
                                <Text className="text-white font-inter-semibold">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave} className="bg-blue-600 px-4 py-2 rounded">
                                <Text className="text-white font-inter-semibold">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default EditTransactionModal;
