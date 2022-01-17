import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useDispatch} from "react-redux";

import FormikForm from "./../../components/form/FormikForm";
import {
  TextInput,
  Checkbox,
} from "./../../components/form/FormikFields";

import { ReactComponent as FbIcon } from "./../../assets/img/icons/fb.svg";
import { ReactComponent as TwIcon } from "./../../assets/img/icons/tw.svg";
import { ReactComponent as GplusIcon } from "./../../assets/img/icons/gplus.svg";
import Logo from "./../../assets/img/logo.svg";
import { SET_REGISTRATION_FORM } from "../../store/UserSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("validation.required.name"),
  email: Yup.string().required("validation.required.email"),
  agree: Yup.bool().oneOf([true], "validation.required.terms"),
});

const Register = (/*{ onSubmit }*/) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const formModel = { name: "", email: "", password: "", agree: false };

  const onSubmit = (values) => {
    dispatch(SET_REGISTRATION_FORM(values))
    history.push({
      pathname:"/createPassword",
    });
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

                <TextInput name="name" placeholder={t("form.name")} />

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
                  {t("register-page.send_confirmation")}
                </Button>

                <span className="sign__delimiter">{t("register-page.or")}</span>

                <div className="sign__social">
                  <Link className="fb" to="#">
                    <FbIcon />
                  </Link>
                  <Link className="tw" to="#">
                    <TwIcon />
                  </Link>
                  <Link className="gl" to="#">
                    <GplusIcon />
                  </Link>
                </div>

                <span className="sign__text">
                  {t("register-page.with-account")}{" "}
                  <Link to="/login">{t("register-page.signin")}</Link>
                </span>
              </FormikForm>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
