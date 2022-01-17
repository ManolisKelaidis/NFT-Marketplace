import i18n from "../i18n";

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("GALLERY_I18N_LANGUAGE", lang);
};

export const getLanguage = () => localStorage.getItem("GALLERY_I18N_LANGUAGE");
