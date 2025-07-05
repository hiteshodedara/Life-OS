
'use client';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type SettingsContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState('USD');
  const [geminiApiKey, setGeminiApiKeyState] = useState('');

  useEffect(() => {
    const storedCurrency = localStorage.getItem('lifeos-currency');
    if (storedCurrency) {
      setCurrencyState(storedCurrency);
    }
    const storedApiKey = localStorage.getItem('lifeos-gemini-api-key');
    if (storedApiKey) {
      setGeminiApiKeyState(storedApiKey);
    }
  }, []);

  const setCurrency = (newCurrency: string) => {
    localStorage.setItem('lifeos-currency', newCurrency);
    setCurrencyState(newCurrency);
  };

  const setGeminiApiKey = (newKey: string) => {
    localStorage.setItem('lifeos-gemini-api-key', newKey);
    setGeminiApiKeyState(newKey);
  }

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, geminiApiKey, setGeminiApiKey }}>
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
