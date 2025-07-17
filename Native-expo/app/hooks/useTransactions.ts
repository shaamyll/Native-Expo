import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

type Transaction = {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  note?: string;
  date: string;
};

const TRANSACTION_KEY = 'transactions';

// Hook
export const useTransactions = () => {
  const queryClient = useQueryClient();

  // Fetch transactions
  const query = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const data = await AsyncStorage.getItem(TRANSACTION_KEY);
      return data ? JSON.parse(data) : [];
    },
  });

  // Add transaction
  const mutation = useMutation({
    mutationFn: async (newTransaction: Transaction) => {
      const existingData = await AsyncStorage.getItem(TRANSACTION_KEY);
      const transactions = existingData ? JSON.parse(existingData) : [];

      const updatedData = [newTransaction, ...transactions];
      await AsyncStorage.setItem(TRANSACTION_KEY, JSON.stringify(updatedData));
      return newTransaction;
    },
    onSuccess: (newTransaction) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      Toast.show({
  type: 'success',
  text1: 'Transaction added!',
  text2: 'Your entry has been saved.',
});
      console.log('success',newTransaction);
    },
  });

  return {  
    transactions: query.data || [],
    addTransaction: mutation.mutate,
    isLoading: query.isLoading,
  };
};
