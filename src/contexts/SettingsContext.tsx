
'use client';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type SettingsContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState('USD');

  useEffect(() => {
    const storedCurrency = localStorage.getItem('lifeos-currency');
    if (storedCurrency) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: string) => {
    localStorage.setItem('lifeos-currency', newCurrency);
    setCurrencyState(newCurrency);
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
