import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormikForm from "./../../components/form/FormikForm";
import { PasswordInput } from "./../../components/form/FormikFields";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/UserSlice";
import { retrieveUser } from "../../store/UserSlice";
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("validation.required.old-password"),
  newPassword: Yup.string().required("validation.required.new-password"),
  confirmNewPassword: Yup.string()
    .required("validation.required.confirm-new-password")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "validation.invalid.confirm-password"
    ),
});

const ProfilePasswordForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentUser } = useSelector((state) => state.user);

  const formModel = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    const model = {
      password: values.newPassword,
    };


    const info = {...currentUser,...model}
    console.log(info)
    dispatch(updateUser({ userId: currentUser._id, info}))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  return (
    <FormikForm
      initialValues={formModel}
      validationSchema={validationSchema}
      formClasses="sign__form--profile"
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Row className="col-md-8">
        <Col className="col-12 col-md-8">
          <h4 className="sign__title">
            {t("user-details-page.change-password")}
          </h4>
        </Col>

        <Col className="col-12 col-md-8">
          <PasswordInput name="oldPassword" label="form.old-password" />
        </Col>

        <Col className="col-12 col-md-8">
          <PasswordInput name="newPassword" label="form.new-password" />
        </Col>

        <Col className="col-12 col-md-8">
          <PasswordInput
            name="confirmNewPassword"
            label="form.confirm-new-password"
          />
        </Col>

        <Col className="col-12">
          <Button className="sign__btn" variant="primary" type="submit">
            {t("change")}
          </Button>
        </Col>
      </Row>
    </FormikForm>
  );
};

export default ProfilePasswordForm;
