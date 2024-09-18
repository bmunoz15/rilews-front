import React, { createContext, useContext, useState } from 'react';
import { GeoJsonModel, AlertsContextType } from '../types/GeoJsonTypes';
import { ALERT_COLORS } from '../config/constant';

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const GeoJsonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<GeoJsonModel | null>(null);

  const getColorByStatus = (dmcStatus: string): string => {
    return ALERT_COLORS[dmcStatus] || ALERT_COLORS['default'];
  };
  return (
    <AlertsContext.Provider value={{ alerts, setAlerts, getColorByStatus }}>
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
