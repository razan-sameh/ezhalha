import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SHIPMENTS } from '@/data/shipments';
import { Shipment } from '@/types/shipment';

interface ShipmentsContextValue {
  shipments: Shipment[];
  addShipment: (shipment: Shipment) => void;
  getShipmentById: (id: string) => Shipment | undefined;
}

const ShipmentsContext = createContext<ShipmentsContextValue | undefined>(undefined);

export const ShipmentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<Shipment[]>(SHIPMENTS as Shipment[]);

  const addShipment = useCallback((shipment: Shipment) => {
    setShipments((prev) => [shipment, ...prev]);
  }, []);

  const getShipmentById = useCallback(
    (id: string) => shipments.find((s) => s.id === id),
    [shipments]
  );

  const value = useMemo(
    () => ({ shipments, addShipment, getShipmentById }),
    [shipments, addShipment, getShipmentById]
  );

  return <ShipmentsContext.Provider value={value}>{children}</ShipmentsContext.Provider>;
};

export function useShipments(): ShipmentsContextValue {
  const ctx = useContext(ShipmentsContext);
  if (!ctx) {
    throw new Error('useShipments must be used within a ShipmentsProvider');
  }
  return ctx;
}
