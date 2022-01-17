import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

import { changeLanguage, getLanguage } from "../../helpers/locale";
import languages from "../../constants/languages";

const LanguageSwitcher = () => {
  const [activeLang, setActiveLang] = useState(getLanguage());

  const getFlag = (lang) => (languages[lang] ? languages[lang].flag : "");
  const getFlagAlt = (lang) => (languages[lang] ? languages[lang].flagAlt : "");
  const getLabel = (lang) => (languages[lang] ? languages[lang].label : "-");

  const onChangeLanguage = (lang) => {
    changeLanguage(lang);
    setActiveLang(lang);
  };

  return (
    <Dropdown className="footer__lang">
      <Dropdown.Toggle
        id="dropdownLang"
        className="footer__lang-btn"
        as="button"
        bsPrefix="c__none"
      >
        <img src={getFlag(activeLang)} alt={getFlagAlt(activeLang)} />
        <span>{getLabel(activeLang)}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="dropdown-menu footer__lang-dropdown"
        aria-labelledby="dropdownLang"
        as="ul"
      >
        {Object.keys(languages).map((lang) => (
          <Dropdown.Item
            key={lang}
            as="li"
            bsPrefix="c__none"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onChangeLanguage(lang);
            }}
          >
            <Dropdown.ItemText as="a" bsPrefix="c__none">
              <img src={getFlag(lang)} alt={getFlagAlt(lang)} />
              <span>{getLabel(lang)}</span>
            </Dropdown.ItemText>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
