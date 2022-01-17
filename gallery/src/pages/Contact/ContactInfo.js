import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import SocialList from "../../components/social/SocialList";

const phone = "88002345678";
const email = "support@Unitok.com";
const address = "221B Baker St, Marylebone, London";
const addressGoogleLink =
  "https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&amp;hl=en&amp;t=v&amp;hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom";

const ContactInfo = () => {
  const { t } = useTranslation();

  const formatedPhone = useMemo(() => {
    var cleaned = ("" + phone).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return (
        match[1] +
        " " +
        match[2] +
        " " +
        match[3] +
        "-" +
        match[4] +
        "-" +
        match[5]
      );
    }

    return phone;
  }, []);

  return (
    <React.Fragment>
      <div className="main__title main__title--sidebar">
        <h2>{t("contact-page.info")}</h2>
        <p>{t("contact-page.info-description")}</p>
      </div>

      <ul className="contacts__list">
        <li>
          <a href={`tel:${phone}`}>{formatedPhone}</a>
        </li>

        <li>
          <a href={`mailto:${email}`}>{email}</a>
        </li>

        <li>
          <a
            href={addressGoogleLink}
            className="open-map"
            rel="noopener noreferrer"
            target="_blank"
          >
            {address}
          </a>
        </li>
      </ul>

      <SocialList className="contacts__social" />
    </React.Fragment>
  );
};

export default ContactInfo;
