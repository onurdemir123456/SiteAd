import React, { createContext, useContext, useState } from "react";
import tr from "../translations/tr";
import en from "../translations/en";

const LanguageContext = createContext();

const translations = { tr, en };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("tr");

  const changeLanguage = (lang) => setLanguage(lang);

  // Çeviri fonksiyonu
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
