import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Row, Col, Button } from "react-bootstrap";

import FormikForm from "../../components/form/FormikForm";
import { TextInput } from "../../components/form/FormikFields";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("validation.required.name"),
  email: Yup.string().required("validation.required.email"),
  subject: Yup.string().required("validation.required.subject"),
  description: Yup.string().required("validation.required.description"),
});

const ContactForm = () => {
  const { t } = useTranslation();

  const formModel = {
    name: "",
    email: "",
    subject: "",
    description: "",
  };

  const onSubmit = (values) => {
  };

  return (
    <FormikForm
      initialValues={formModel}
      validationSchema={validationSchema}
      formClasses="sign__form--contacts"
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Row className="w-100">
        <Col className="col-12 col-md-6">
          <TextInput
            name="name"
            placeholder={t("contact-page.form.placeholder.name")}
          />
        </Col>

        <Col className="col-12 col-md-6">
          <TextInput
            name="email"
            placeholder={t("contact-page.form.placeholder.email")}
          />
        </Col>

        <Col className="col-12">
          <TextInput
            name="subject"
            placeholder={t("contact-page.form.placeholder.subject")}
          />
        </Col>

        <Col className="col-12">
          <TextInput
            name="description"
            placeholder={t("contact-page.form.placeholder.description")}
            inputClass="sign__textarea"
            as="textarea"
            rows="4"
          />
        </Col>

        <Col className="col-12 col-xl-3">
          <Button className="sign__btn" variant="primary" type="submit">
            {t("send")}
          </Button>
        </Col>
      </Row>
    </FormikForm>
  );
};

export default ContactForm;
