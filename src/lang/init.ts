import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import ptBR from "./pt-BR";
import en from "./en";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: navigator.language,
    supportedLngs: ["en", "pt-BR"],
    resources: {
      en: {
        translation: en,
      },
      "pt-BR": {
        translation: ptBR,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
