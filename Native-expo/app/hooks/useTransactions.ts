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

//Add Transaction Hook
export const useAddTransaction = () => {
  const queryClient = useQueryClient();

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
      console.log('success', newTransaction);
    },
  });

  return {
    addTransaction: mutation.mutate,
  };
};

//get transactions
export const useGetTransactions = () => {
  const query = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 1000));
      const data = await AsyncStorage.getItem(TRANSACTION_KEY);
      return data ? JSON.parse(data) : [];
    },
  });

  return {
    transactions: query.data || [],
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};


//Delete Transaction
export const useDeleteTransaction = () => {

  const queryClient = useQueryClient();

    //Delete transaction
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const data = await AsyncStorage.getItem('transactions');
      const transactions = data ? JSON.parse(data) : [];
      const afterDeletion = transactions.filter((t: Transaction) => t.id !== id);
      await AsyncStorage.setItem('transactions', JSON.stringify(afterDeletion));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      Toast.show({
        type: 'success',
        text1: 'Deleted!',
        text2: 'Transaction removed.',
      });
    },
  });

  return {
    deleteTransaction: deleteMutation.mutate,
  }

}


//Edit Transaction
export const useEditTransaction = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (updatedTransaction: Transaction) => {
      const data = await AsyncStorage.getItem(TRANSACTION_KEY);
      const transactions: Transaction[] = data ? JSON.parse(data) : [];

      const updatedTransactions = transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      );

      await AsyncStorage.setItem(TRANSACTION_KEY, JSON.stringify(updatedTransactions));
      return updatedTransaction;
    },
    onSuccess: (updatedTransaction) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });

      Toast.show({
        type: 'success',
        text1: 'Transaction updated!',
        text2: 'Changes saved successfully.',
      });

      console.log('Updated:', updatedTransaction);
    },
  });

  return {
    editTransaction: editMutation.mutate,
    isEditing: editMutation.isPending,
  };
};

