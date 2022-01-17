import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";

import FooterLinks from "./FooterLinkList";
import SocialList from "../social/SocialList";
import LanguageSwitcher from "./LanguageSwitcher";

import logoImg from "../../assets/img/logo.svg";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Container className="pb-0">
        <Row>
          <Col className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 order-4 order-md-1 order-lg-4 order-xl-1">
            <div className="footer__logo">
              <img style={{"backgroundColor":"white"}} src={logoImg} alt="app_logo" />
            </div>

            <p className="footer__tagline">
              <Trans
                t={t}
                i18nKey="footer.tagline"
                components={{ br: <br /> }}
              />
            </p>

            <LanguageSwitcher />
          </Col>

          <FooterLinks />
        </Row>

        <Row>
          <Col className="col-12">
            <div className="footer__content">
              <SocialList className="footer__social" />

              <small className="footer__copyright">
                © NFT-Gallery, {new Date().getFullYear()}.
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
