import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Row className="row--grid">
        <Col className="col-12">
          <div className="main__title main__title--page">
            <h1>{t("contact-page.title")}</h1>
          </div>
        </Col>
      </Row>

      <Row className="row--grid">
        <Col className="col-12 col-lg-7 col-xl-8">
          <ContactForm />
        </Col>
        <Col className="col-12 col-md-6 col-lg-5 col-xl-4">
          <ContactInfo />
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
