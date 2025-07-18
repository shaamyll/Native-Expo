import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';

const Chart = () => {
  const screenWidth = Dimensions.get('window').width - 32;

  const expenseData = [
    { name: 'Food', amount: 250, color: '#facc15' },        // 🍋 Yellow
    { name: 'Transport', amount: 100, color: '#6366f1' },   // 🔵 Indigo
    { name: 'Rent', amount: 400, color: '#10b981' },        // 💚 Emerald
    { name: 'Entertainment', amount: 150, color: '#ec4899' }// 💖 Pink
  ];

  const totalExpense = expenseData.reduce((acc, item) => acc + item.amount, 0);

  const pieChartData = expenseData.map(item => ({
    name: item.name,
    population: item.amount,
    color: item.color,
    legendFontColor: '#e5e7eb',
    legendFontSize: 13,
  }));

  return (
    <View style={{ marginTop: 40, paddingHorizontal: 16 }}>
      {/* 🍩 Donut Chart */}
      <Text style={{ fontSize: 22, fontWeight: '700', color: '#f1f5f9', marginBottom: 12 }}>
        Expense Summary
      </Text>
      <PieChart
        data={pieChartData}
        width={screenWidth}
        height={230}
        chartConfig={{
          color: () => '#ffffff',
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[0, 0]}
        hasLegend={true}
        absolute
      />
      <View style={{ position: 'absolute', top: 180, alignSelf: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f9fafb', textAlign: 'center' }}>
          ₹{totalExpense}
        </Text>
        <Text style={{ fontSize: 13, color: '#cbd5e1', textAlign: 'center' }}>
          Total Spent
        </Text>
      </View>

      {/* 📊 Bar Chart */}
      <View style={{ marginTop: 48 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#f1f5f9', marginBottom: 12 }}>
          Expense Comparison
        </Text>
        <BarChart
          data={{
            labels: expenseData.map(item => item.name),
            datasets: [{ data: expenseData.map(item => item.amount) }],
          }}
          width={screenWidth}
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=''
          chartConfig={{
            backgroundGradientFrom: '#0f172a',
            backgroundGradientTo: '#1e293b',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => '#cbd5e1',
            barPercentage: 0.6,
            propsForBackgroundLines: {
              stroke: '#334155'
            },
          }}
          verticalLabelRotation={0}
          style={{ borderRadius: 16 }}
          showValuesOnTopOfBars
        />
      </View>
    </View>
  );
};

export default Chart;