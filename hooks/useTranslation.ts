import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';

type Language = 'en' | 'ru';
const LANG_KEY = 'meditation_language';

// Helper to get nested properties from a JSON object
const getNestedTranslation = (obj: any, key: string): string | undefined => {
  return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [translations, setTranslations] = useState<Record<Language, any> | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enResponse, ruResponse] = await Promise.all([
          fetch('/locales/en.json'),
          fetch('/locales/ru.json'),
        ]);
        const en = await enResponse.json();
        const ru = await ruResponse.json();
        setTranslations({ en, ru });
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to empty objects to avoid crashing
        setTranslations({ en: {}, ru: {} });
      }
    };

    loadTranslations();
  }, []);

  const getInitialLanguage = (): Language => {
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang && (storedLang === 'en' || storedLang === 'ru')) {
      return storedLang as Language;
    }
    const browserLang = navigator.language.split(/[-_]/)[0];
    return browserLang === 'ru' ? 'ru' : 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    if (translations) { // Only set after translations are loaded
        localStorage.setItem(LANG_KEY, language);
    }
  }, [language, translations]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    if (!translations) {
      return ''; // Return empty string while loading to avoid showing keys
    }
    let translation = getNestedTranslation(translations[language], key) || key;

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{{${placeholder}}}`, String(replacements[placeholder]));
      });
    }

    return translation;
  }, [language, translations]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);
  
  // Don't render children until translations are loaded to prevent UI flicker
  if (!translations) {
    return null; 
  }

  // FIX: Replace JSX with React.createElement to be compatible with .ts file extension.
  return React.createElement(LanguageContext.Provider, { value: value }, children);
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
