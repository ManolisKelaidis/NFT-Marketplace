import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Button } from "react-bootstrap";
import * as Yup from "yup";

import FormikForm from "./../../components/form/FormikForm";
import { PasswordInput } from "./../../components/form/FormikFields";

import { createUser } from "../../store/UserSlice";
import { loginUser } from "../../store/AuthSlice";

import Logo from "./../../assets/img/logo.svg";

const CreatePassword = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const onSubmit = (values) => {
    const completeForm = {
      username: userState.form.username,
      password: values.password,
      email: userState.form.email,
    };
    dispatch(createUser(completeForm))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
        return dispatch(
          loginUser({
            email: completeForm.email,
            password: completeForm.password,
          })
        ).unwrap()
      })
      .then(() => {
        history.push("/home");
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("validation.required.password"),
  });

  const formModel = { password: "" };

  return (
    <Container>
      <Row>
        <div className="sign__content">
          <FormikForm
            initialValues={formModel}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Link to="/home" className="sign__logo">
              <img src={Logo} alt="logo" />
            </Link>
            <h6
              className="w-100 mb-4"
              style={{ fontSize: "16px", color: "#bdbdbd" }}
            >
              {t("create-password-page.create_password")}
            </h6>
            <PasswordInput
              name="password"
              placeholder={t("create-password-page.password")}
            />

            <Button
              block
              variant="primary"
              size="lg"
              type="submit"
              className="sign__btn mt-0"
            >
              {t("create-password-page.confirm")}
            </Button>
          </FormikForm>
        </div>
      </Row>
    </Container>
  );
};

export default CreatePassword;
