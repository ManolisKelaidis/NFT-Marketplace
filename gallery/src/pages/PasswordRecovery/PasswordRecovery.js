import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";

import FormikForm from "./../../components/form/FormikForm";
import { TextInput, Checkbox } from "./../../components/form/FormikFields";

import Logo from "./../../assets/img/logo.svg";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("validation.required.email"),
  agree: Yup.bool().oneOf([true], "validation.required.terms"),
});

const PasswordRecovery = () => {
  const { t } = useTranslation();
  const formModel = { email: "", agree: false };

  const onSubmit = (values) => {
    console.log("SUBMIT", values);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="sign">
            <div className="sign__content">
              <FormikForm
                initialValues={formModel}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Link to="/home" className="sign__logo">
                  <img src={Logo} alt="logo" />
                </Link>

                <TextInput name="email" placeholder={t("form.email")} />

                <Checkbox label="form.terms-agree.agree" name="agree">
                  <Link to="/privacy-policy">
                    {t("form.terms-agree.terms")}
                  </Link>
                </Checkbox>

                <Button
                  block
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="sign__btn"
                >
                  {t("forgot-password-page.send")}
                </Button>

                <span className="sign__text">
                  {t("forgot-password-page.send-email")}
                </span>
              </FormikForm>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordRecovery;
