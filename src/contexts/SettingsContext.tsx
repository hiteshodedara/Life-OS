
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
    try {
      const storedCurrency = localStorage.getItem('lifeos-currency');
      if (storedCurrency) {
        setCurrencyState(storedCurrency);
      }
      const storedApiKey = localStorage.getItem('lifeos-gemini-api-key');
      if (storedApiKey) {
        setGeminiApiKeyState(storedApiKey);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, []);

  const setCurrency = (newCurrency: string) => {
    try {
      localStorage.setItem('lifeos-currency', newCurrency);
      setCurrencyState(newCurrency);
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
  };

  const setGeminiApiKey = (newKey: string) => {
    try {
      localStorage.setItem('lifeos-gemini-api-key', newKey);
      setGeminiApiKeyState(newKey);
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
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
