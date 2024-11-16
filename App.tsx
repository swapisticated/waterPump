import React from 'react';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import Dashboard from './screens/dashboard';
import StatisticsScreen from './screens/statisticsScreen';
import { WifiProvider } from './utils/WifiContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <WifiProvider>
      <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: '#0B131A', // Adjust this color as needed
          background: '#1f1f1f',
          card: '#000000',
          text: '#FFFFFF',
          border: '#1e90ff', // Adjust this color as needed
          notification: '#1e90ff' // Adjust this color as needed
        },
      }}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{
              title: 'Statistics',
              headerStyle: {
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
