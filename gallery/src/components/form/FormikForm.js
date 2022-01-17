import React from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

const FormikForm = ({
  innerRef,
  initialValues,
  validate,
  formClasses = "",
  onSubmit,
  children,
  ...rest
}) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      {...rest}
    >
      <Form className={`sign__form ${formClasses}`}>{children}</Form>
    </Formik>
  );
};

FormikForm.propTypes = {
  innerRef: PropTypes.any,
  initialValues: PropTypes.any,
  validate: PropTypes.any,
  onSubmit: PropTypes.func,
};

export default React.memo(FormikForm);
