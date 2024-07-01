import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, Language } from '../types/types';


interface GlobalContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  changeLanguage: (language: Language) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  theme: "light",
  setTheme: () => {},
  language: "en",
  changeLanguage: () => {},
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = (savedTheme as Theme) || (systemPrefersDark ? 'dark' : 'light');

    root.classList.add(initialTheme);
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (language: Language) => {
    setLanguage(language);
  };

  return (
    <GlobalContext.Provider value={{ theme, setTheme, language, changeLanguage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
