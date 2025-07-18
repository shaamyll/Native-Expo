import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useGetTransactions } from '../hooks/useTransactions';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'phosphor-react-native';

const DonutChart = ({ radius = 80, strokeWidth = 20 }: any) => {
  //Hook
  const { transactions } = useGetTransactions();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const availableBalance = Math.max(totalIncome - totalExpense, 0);

  // Chart math
  const total = totalIncome + totalExpense || 1;
  const radiusOffset = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * radiusOffset;

  const incomePercent = (totalIncome / total) * 100;
  const expensePercent = (totalExpense / total) * 100;
  const availablePercent = (availableBalance / totalIncome) * 100;

  const incomeOffset = circumference - (circumference * incomePercent) / 100;
  const availableOffset = circumference - (circumference * availablePercent) / 100;

  return (
  <LinearGradient
  colors={['#1e293b', '#0f172a', '#1e40af']} // slate, midnight, indigo-blue
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}  
  style={{
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 10,
    marginTop: 25,
  }}
>
  <Text className="text-white text-lg font-semibold mb-7 ">
    Balance Overview
  </Text>

      <View className="flex-row items-center justify-center space-x-2">
        <Text>Chart p</Text>
        {/* Donut Chart */}
        <View className="relative">
          <Svg width={radius * 2} height={radius * 2}>
            {/* Expense  */}
            <Circle
              stroke="#dc2626"
              fill="transparent"
              strokeWidth={strokeWidth}
              cx={radius}
              cy={radius}
              r={radiusOffset}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={0}
              rotation={-90}
              originX={radius}
              originY={radius}
            />
            {/* Income - Green */}
            <Circle
              stroke="#4ade80"
              fill="transparent"
              strokeWidth={strokeWidth}
              cx={radius}
              cy={radius}
              r={radiusOffset}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={incomeOffset}
              rotation={-90}
              originX={radius}
              originY={radius}
              strokeLinecap="round"
            />
            {/* Available Balance  */}
            <Circle
              stroke="#15803d"
              fill="transparent"
              strokeWidth={strokeWidth}
              cx={radius}
              cy={radius}
              r={radiusOffset}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={availableOffset}
              rotation={-90}
              originX={radius}
              originY={radius}
              strokeLinecap="round"
            />
          </Svg>

          {/* Center Label */}
          <View className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] items-center">
            <Wallet size={26} color="#15803d" weight="bold" />
            <Text className="text-white font-bold text-xl mt-1">
              ₹{availableBalance.toFixed(2)}
            </Text>
            <Text className="text-sm text-white/80">Available</Text>
          </View>
        </View>

        {/* Breakdown Panel */}
        <View className="space-y-4 ms-5">
          <View className="flex-row items-center space-x-2">
            <ArrowUpRight size={24} color="#22c55e" weight="bold" />
            <View>
              <Text className="text-white text-sm">Income</Text>
              <Text className="text-white text-lg font-semibold">₹{totalIncome}</Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-2">
            <ArrowDownLeft size={24} color="#ef4444" weight="bold" />
            <View>
              <Text className="text-white text-sm">Expense</Text>
              <Text className="text-white text-lg font-semibold">₹{totalExpense}</Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DonutChart;