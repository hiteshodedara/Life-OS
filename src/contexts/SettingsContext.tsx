
'use client';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type SettingsContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  isValidApiKey: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Helper function to validate Gemini API key format
const validateGeminiApiKey = (key: string): boolean => {
  if (!key || typeof key !== 'string') return false;
  const trimmedKey = key.trim();
  if (trimmedKey.length === 0) return false;
  
  // Basic validation for Gemini API key format
  // Gemini API keys typically start with "AIza" and have a specific length
  return trimmedKey.startsWith('AIza') && trimmedKey.length >= 30;
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState('USD');
  const [geminiApiKey, setGeminiApiKeyState] = useState('');
  const [isValidApiKey, setIsValidApiKey] = useState(false);

  useEffect(() => {
    try {
      const storedCurrency = localStorage.getItem('lifeos-currency');
      if (storedCurrency) {
        setCurrencyState(storedCurrency);
      }
      
      const storedApiKey = localStorage.getItem('lifeos-gemini-api-key');
      if (storedApiKey) {
        const isValid = validateGeminiApiKey(storedApiKey);
        setGeminiApiKeyState(storedApiKey);
        setIsValidApiKey(isValid);
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
      const trimmedKey = newKey.trim();
      const isValid = validateGeminiApiKey(trimmedKey);
      
      // Only store if the key is valid or empty (for clearing)
      if (isValid || trimmedKey === '') {
        localStorage.setItem('lifeos-gemini-api-key', trimmedKey);
        setGeminiApiKeyState(trimmedKey);
        setIsValidApiKey(isValid);
      } else {
        // Still update state to show the invalid key in the UI for user feedback
        setGeminiApiKeyState(trimmedKey);
        setIsValidApiKey(false);
        
        // Don't store invalid keys in localStorage
        if (trimmedKey !== '') {
          console.warn('Invalid API key format detected');
        }
      }
    } catch (error) {
        console.error("Could not access localStorage:", error);
        setGeminiApiKeyState(newKey);
        setIsValidApiKey(false);
    }
  }

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, geminiApiKey, setGeminiApiKey, isValidApiKey }}>
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
