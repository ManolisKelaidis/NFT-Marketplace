import React from "react";

import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";

import * as Yup from "yup";

import { TextInput } from "./../../components/form/FormikFields";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("validation.required.username"),
  email: Yup.string()
    .email("validation.invalid.email")
    .required("validation.required.email"),
  firstName: Yup.string().required("validation.required.first-name"),
  lastName: Yup.string().required("validation.required.last-name"),
});

const ProfileDetailsForm = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col className="col-12">
        <h4 className="sign__title">
          {t("user-details-page.profile-details")}
        </h4>
      </Col>

      <Col className="col-12 col-md-6 col-lg-12 col-xl-6">
        <TextInput
          name="username"
          label="form.username"
          placeholder={t("form.username")}
        />
      </Col>

      <Col className="col-12 col-md-6 col-lg-12 col-xl-6">
        <TextInput
          name="email"
          label="form.email"
          placeholder={t("form.email")}
        />
      </Col>

      <Col className="col-12 col-md-6 col-lg-12 col-xl-6">
        <TextInput
          name="firstName"
          label="form.first-name"
          placeholder={t("form.first-name")}
        />
      </Col>

      <Col className="col-12 col-md-6 col-lg-12 col-xl-6">
        <TextInput
          name="lastName"
          label="form.last-name"
          placeholder={t("form.last-name")}
        />
      </Col>
      <Col className="col-12 col-md-12 col-lg-12 col-xl-12">
        <TextInput
          inputClass="sign__textarea"
          as="textarea"
          rows="4"
          name="description"
          label="form.description"
          placeholder={t("form.description")}
        />
      </Col>
    </Row>
  );
};

export default ProfileDetailsForm;
