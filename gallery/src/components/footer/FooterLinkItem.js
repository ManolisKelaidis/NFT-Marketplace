import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FooterLinkItem = ({ link }) => {
  const { t } = useTranslation();

  return (
    <div>
      {link.path === "/collections" ? (
        <Link
          to={{
            pathname: "/collections",
            search: `?query=${t(link.label)}`,
          }}
        >
          {t(link.label)}
        </Link>
      ) : (
        <Link to={link.path}>{t(link.label)}</Link>
      )}
    </div>
  );
};

export default FooterLinkItem;
