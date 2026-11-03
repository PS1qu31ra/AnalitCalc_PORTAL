

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Language,
  TranslationDictionary,
  translations,
} from "@/lib/i18n/translations";


type LanguageContextValue = {
  language: Language;

  setLanguage:
    (language: Language) => void;

  dictionary:
    TranslationDictionary;
};


const LanguageContext =
  createContext<
    LanguageContextValue | undefined
  >(undefined);


const STORAGE_KEY =
  "analit-language";


export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    language,
    setLanguageState,
  ] =
    useState<Language>(
      "pt-BR"
    );


  useEffect(() => {
    const stored =
      window.localStorage.getItem(
        STORAGE_KEY
      );


    if (
      stored === "pt-BR" ||
      stored === "en"
    ) {
      setLanguageState(
        stored
      );

      return;
    }


    const browserLanguage =
      window.navigator.language
        .toLowerCase();


    if (
      browserLanguage.startsWith(
        "en"
      )
    ) {
      setLanguageState(
        "en"
      );
    }
  }, []);


  useEffect(() => {
    document.documentElement.lang =
      language;
  }, [language]);


  function setLanguage(
    nextLanguage: Language
  ) {
    setLanguageState(
      nextLanguage
    );

    window.localStorage.setItem(
      STORAGE_KEY,
      nextLanguage
    );
  }


  const dictionary =
    translations[
      language
    ];


  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dictionary,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );


  if (!context) {
    throw new Error(
      "useLanguage deve ser utilizado dentro de LanguageProvider."
    );
  }


  return context;
}