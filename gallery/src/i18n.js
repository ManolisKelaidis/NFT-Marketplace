import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationIT from "./locales/it.json";

const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
};

const language = localStorage.getItem("GALLERY_I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("GALLERY_I18N_LANGUAGE", "it");
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("GALLERY_I18N_LANGUAGE") || "it",
    fallbackLng: "it",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
