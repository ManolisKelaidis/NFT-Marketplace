import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import * as Yup from "yup";

import FormikForm from "./../../components/form/FormikForm";
import { TextInput, PasswordInput } from "./../../components/form/FormikFields";

import { loginUser } from "../../store/AuthSlice";
import { useNotify } from "../../providers/notify";

import { ReactComponent as FbIcon } from "./../../assets/img/icons/fb.svg";
import { ReactComponent as TwIcon } from "./../../assets/img/icons/tw.svg";
import { ReactComponent as GplusIcon } from "./../../assets/img/icons/gplus.svg";
import Logo from "./../../assets/img/logo.svg";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("validation.required.email"),
  password: Yup.string().required("validation.required.password"),
});

const formModel = { email: "", password: "" };

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { showNotification } = useNotify();
  const [remember, setRemember] = useState(false);

  const onSubmit = (values) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          type: "error",
          message: "Please check your email and password",
        });
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

                <TextInput name="email" placeholder={t("form.email")} />

                <PasswordInput
                  name="password"
                  placeholder={t("form.password")}
                />

                <Form.Check
                  className="sign__group sign__group--checkbox pl-0 pb-3"
                  type="checkbox"
                  id="remember"
                  label={t("login-page.remember")}
                  value={remember}
                  onChange={() => {
                    setRemember(!remember);
                  }}
                />

                <Button
                  block
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="sign__btn"
                >
                  {t("login-page.login")}
                </Button>
                <span className="sign__delimiter">{t("login-page.or")}</span>

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
                  {t("login-page.no-account")}{" "}
                  <Link to="/register">{t("login-page.signup")}</Link>
                </span>

                <span className="sign__text">
                  <Link to="/password-recovery">
                    {t("login-page.forgot-password")}
                  </Link>
                </span>
              </FormikForm>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
