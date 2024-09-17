import React, { createContext, useContext, useState } from 'react';
import { GeoJsonModel, AlertsContextType } from '../types/GeoJsonTypes.tsx';

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const GeoJsonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<GeoJsonModel | null>(null);


  return (
    <AlertsContext.Provider value={{ alerts, setAlerts }}>
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = (): AlertsContextType => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error('useAlerts must be used within a GeoJsonProvider');
  }
  return context;
};
