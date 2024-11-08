import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/dashboard';
import StatisticsScreen from './screens/statisticsScreen';
import { WifiProvider } from './utils/WifiContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <WifiProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{
              title: 'Statistics', headerStyle: {
                backgroundColor: '#1f1f1f', 
              },
              headerTintColor: '#ffffff',
            }}

          />
        </Stack.Navigator>
      </NavigationContainer>
    </WifiProvider>
  );
};

export default App;