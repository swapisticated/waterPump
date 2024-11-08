import React, { createContext, useState, useEffect } from 'react';
import { connectToEsp32 } from './wifiService';

export const WifiContext = createContext();

export const WifiProvider = ({ children }) => {
  const [flowRate, setFlowRate] = useState(0);
  const [totalLitersUsed, setTotalLitersUsed] = useState(0);
  const [motorStopped, setMotorStopped] = useState(true);

  useEffect(() => {
    const updateValues = (flowRate, totalLitersUsed, motorStopped) => {
      setFlowRate(flowRate);
      setTotalLitersUsed(totalLitersUsed);
      setMotorStopped(motorStopped);
    };

    // Connect to ESP32 and listen for data
    const disconnect = connectToEsp32(updateValues);

    // Cleanup the connection when the app is closed
    return () => {
      disconnect();
    };
  }, []);

  return (
    <WifiContext.Provider value={{ flowRate, totalLitersUsed, motorStopped }}>
      {children}
    </WifiContext.Provider>
  );
};
