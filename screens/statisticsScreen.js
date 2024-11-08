import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, ScrollView } from 'react-native';
import { WifiContext } from '../utils/WifiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart, PieChart } from 'react-native-chart-kit';
import Background from '../components/Background';

const screenWidth = Dimensions.get('window').width;

const StatisticsScreen = ({ navigation }) => {
  const { totalLitersUsed } = useContext(WifiContext);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [monthlyUsage, setMonthlyUsage] = useState(0);

  useEffect(() => {
    const calculateUsage = async () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const currentMonth = currentDate.slice(0, 7);

      try {
        const storedData = await AsyncStorage.getItem('waterUsageData');
        const waterUsageArray = storedData ? JSON.parse(storedData) : [];

        const dailyRecords = waterUsageArray.filter(record =>
          record.timestamp.startsWith(currentDate)
        );
        const dailyTotal = dailyRecords.reduce((sum, record) => sum + record.totalLitersUsed, 0);
        setDailyUsage(dailyTotal);

        const monthlyRecords = waterUsageArray.filter(record =>
          record.timestamp.startsWith(currentMonth)
        );
        const monthlyTotal = monthlyRecords.reduce((sum, record) => sum + record.totalLitersUsed, 0);
        setMonthlyUsage(monthlyTotal);
      } catch (error) {
        console.error('Error fetching water usage data:', error);
      }
    };

    calculateUsage();
  }, []);

  return (
    // <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Water Usage Statistics</Text>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Today's Water Usage</Text>
          <BarChart
            data={{
              labels: ['Today'],
              datasets: [{ data: [dailyUsage] }],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisSuffix="L"
            yAxisInterval={5} // Adjust y-axis interval to show fewer labels
            chartConfig={{
              backgroundColor: '#252525',
              backgroundGradientFrom: '#252525',
              backgroundGradientTo: '#181818',
              color: (opacity = 1) => `rgba(240, 84, 84, ${opacity})`,
              labelColor: () => '#FFFFFF',
              style: { borderRadius: 16 },
            }}
            formatYLabel={(value) => `${(value / 50).toFixed(1)}L`} // Reduce scale by dividing each label by 10
            style={styles.chart}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>This Month's Water Usage</Text>
          <PieChart
            data={[
              {
                name: 'Monthly Usage',
                population: monthlyUsage,
                color: '#F05454',
                legendFontColor: '#FFFFFF',
                legendFontSize: 15,
              },
              {
                name: 'Remaining',
                population: 10000 - monthlyUsage,
                color: '#252525',
                legendFontColor: '#FFFFFF',
                legendFontSize: 15,
              },
            ]}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(240, 84, 84, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </View>

        <Button
          title="Go to Dashboard"
          color="#57635A"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </ScrollView>
    // </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor:'#181818'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#181818',
    padding:20,
    borderRadius: 20
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#AAAAAA',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    width:10
  },
});

export default StatisticsScreen;
