"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import TRANSLATIONS, { type Lang, type Translation } from "@/content/translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
};

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: TRANSLATIONS.en,
});

const STORAGE_KEY = "anay-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "ar" || stored === "en") {
        setLangState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
