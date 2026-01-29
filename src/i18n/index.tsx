import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language type definition
export type Language = 'uz' | 'ru';

// Translation data type
export type Translations = Record<string, string | Translations>;

// i18n Context type
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// LocalStorage key for language preference
const LANGUAGE_STORAGE_KEY = 'app_language';

// Default language
const DEFAULT_LANGUAGE: Language = 'uz';

// Load translations dynamically
const loadTranslations = async (lang: Language): Promise<Translations> => {
  try {
    const translations = await import(`./${lang}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
    // Fallback to Uzbek if translation file not found
    if (lang !== 'uz') {
      const fallback = await import('./uz.json');
      return fallback.default;
    }
    return {};
  }
};

// Provider component
interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  // Get initial language from localStorage or default
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (saved === 'uz' || saved === 'ru') {
        return saved;
      }
    }
    return DEFAULT_LANGUAGE;
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [translations, setTranslations] = useState<Translations>({});

  // Load translations when language changes
  useEffect(() => {
    loadTranslations(language).then(setTranslations);
  }, [language]);

  // Set language and persist to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  // Translation function - supports nested keys with dot notation
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Return key if translation not found (for debugging)
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Custom hook to use i18n
export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
};
