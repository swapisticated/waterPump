import TcpSocket from 'react-native-tcp-socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

let client;  // Keep the client in a global variable to send commands later

export const connectToEsp32 = (updateValues) => {
  client = TcpSocket.createConnection(
    { port: 8080, host: '192.168.4.1' },  // ESP32's IP in AP mode
    () => {
      console.log('Connected to ESP32!');
    }
  );

  // Listen for data from ESP32
  client.on('data', async (data) => {
    const receivedData = JSON.parse(data.toString());
    const { flowRate, totalLitersUsed, motorStopped } = receivedData;

    // Update values in the UI
    updateValues(flowRate, totalLitersUsed, motorStopped);

    // Store totalLitersUsed with timestamp
    const currentDate = new Date().toISOString();  // Capture timestamp
    const waterRecord = { totalLitersUsed, timestamp: currentDate };

    try {
      // Get stored water usage data
      const storedData = await AsyncStorage.getItem('waterUsageData');
      const waterUsageArray = storedData ? JSON.parse(storedData) : [];

      // Add new record
      waterUsageArray.push(waterRecord);

      // Save updated array
      await AsyncStorage.setItem('waterUsageData', JSON.stringify(waterUsageArray));
    } catch (error) {
      console.error('Error storing water usage data:', error);
    }
  });

  client.on('error', (error) => {
    console.error('Connection error:', error);
  });

  // return () => {
  //   client.destroy();
  // };
};

// Function to send valve control commands
// export const sendValveCommand = (command) => {
//   if (client) {
//     try {
//       const message = JSON.stringify({command});  // Stringify the command object
//       client.write(message);
//       console.log(`Sent command: ${JSON.stringify(command)}`);  // Log the command being sent
//     } catch (error) {
//       console.error('Failed to send command:', error);
//     }
//   } else {
//     console.error('Client is not connected.');
//   }
// };
export const sendValveCommand = (command, value = null) => {
  if (client) {
    try {
      // Prepare the message with or without a value based on the command type
      const message = value !== null 
        ? JSON.stringify({ command, value }) 
        : JSON.stringify({ command });

      client.write(message);
      console.log(`Sent command: ${message}`);  // Log the exact command being sent
    } catch (error) {
      console.error('Failed to send command:', error);
    }
  } else {
    console.error('Client is not connected.');
  }
};



