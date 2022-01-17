import React, { useState } from "react";
import { useField, isFunction } from "formik";
import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ReactComponent as Eye } from "../../assets/img/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/img/icons/eye-slash.svg";
import webSite from "../../assets/img/linkedin.svg";
import twitter from "../../assets/img/twitter.svg";
import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";

import "./Form.scss";

const FormikFormGroup = ({ label, groupClass = "", children }) => {
  const { t } = useTranslation();

  return (
    <Form.Group className={`formik-form-group sign__group ${groupClass}`}>
      {label && <Form.Label className='sign__label'>{t(label)}</Form.Label>}
      {children}
    </Form.Group>
  );
};

const LinkInput = ({
  label,image,
  inputClass = "sign__input",
  onChange,
  ...rest
}) => {
  const categoryOptions = {
    site:webSite,
    facebook:facebook,
    twitter:twitter,
    instagram:instagram
  };
  const { t } = useTranslation();
  const [field, meta] = useField(rest);

  const handleChange = (event) => {
    field.onChange(event);

    if (isFunction(onChange)) onChange(event.target.value);
  };

  return (
    <FormikFormGroup>
      <InputGroup>
        <InputGroup.Text style={{backgroundColor:"transparent",border:"none"}} id='inputGroupPrepend'><img style={{width:"35px",height:"35px"}} src={categoryOptions[`${image}`]} alt="pic"/></InputGroup.Text>

        <Form.Control
          className={`${inputClass} ${
            meta.touched && meta.error ? "error" : ""
          }`}
          name={field.name}
          value={field.value}
          onChange={handleChange}
          {...rest}
        />
        {meta.touched && meta.error && (
          <Form.Text className='invalid-feedback d-block'>
            {t(meta.error)}
          </Form.Text>
        )}
      </InputGroup>
    </FormikFormGroup>
  );
};

const TextInput = ({
  label,
  inputClass = "sign__input",
  onChange,
  ...rest
}) => {
  const { t } = useTranslation();
  const [field, meta] = useField(rest);

  const handleChange = (event) => {
    field.onChange(event);

    if (isFunction(onChange)) onChange(event.target.value);
  };

  return (
    <FormikFormGroup label={label}>
      <Form.Control
        className={`${inputClass} ${meta.touched && meta.error ? "error" : ""}`}
        name={field.name}
        value={field.value}
        onChange={handleChange}
        {...rest}
      />
      {meta.touched && meta.error && (
        <Form.Text className='invalid-feedback d-block'>
          {t(meta.error)}
        </Form.Text>
      )}
    </FormikFormGroup>
  );
};

const PasswordInput = ({ label, onChange, ...rest }) => {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [field, meta] = useField(rest);

  const handleChange = (event) => {
    field.onChange(event);

    if (isFunction(onChange)) onChange(event.target.value);
  };

  return (
    <FormikFormGroup label={label}>
      <InputGroup>
        <Form.Control
          className={`${
            meta.touched && meta.error
              ? "error sign__input password_field"
              : "sign__input password_field"
          }`}
          name={field.name}
          value={field.value}
          type={passwordVisible ? "text" : "password"}
          onChange={handleChange}
          {...rest}
        />
        <InputGroup.Append onClick={() => setPasswordVisible(!passwordVisible)}>
          <InputGroup.Text>
            {passwordVisible ? <Eye style={{zIndex:"6"}} /> : <EyeSlash style={{zIndex:"6"}} />}
          </InputGroup.Text>
        </InputGroup.Append>
        {meta.touched && meta.error && (
          <Form.Text className='invalid-feedback d-block'>
            {t(meta.error)}
          </Form.Text>
        )}
      </InputGroup>
    </FormikFormGroup>
  );
};

const Checkbox = ({ label, onChange, children, ...rest }) => {
  const { t } = useTranslation();
  const [field, meta, helpers] = useField(rest);

  const handleChange = (e) => {
    helpers.setValue(e.target.checked);

    if (isFunction(onChange)) onChange(e.target.checked);
  };

  return (
    <FormikFormGroup>
      <Form.Check
        className='sign__group sign__group--checkbox pl-0 pt-3'
        id={field.name}
        name={field.name}
        type='checkbox'
        {...rest}
      >
        <Form.Check.Input
          type='checkbox'
          checked={field.value}
          onChange={handleChange}
        />
        <Form.Check.Label>
          {t(label)} {children ? children : ""}
        </Form.Check.Label>
      </Form.Check>
      {meta.touched && meta.error && (
        <Form.Text className='invalid-feedback d-block'>
          {t(meta.error)}
        </Form.Text>
      )}
    </FormikFormGroup>
  );
};

const RadioGroup = ({ itemIdPrefix, label, options, onChange, ...rest }) => {
  const { t } = useTranslation();
  const [field, meta] = useField(rest);

  const onSelectItem = (value) => {
    field.onChange(value);

    if (isFunction(onChange)) onChange(value);
  };

  return (
    <FormikFormGroup label={label} groupClass='sign__group--row'>
      <ul className='sign__radio sign__radio--single'>
        {options.map((item, index) => (
          <li key={index}>
            <Form.Check
              id={`${itemIdPrefix}-radio-${index}`}
              type='radio'
              className='pl-0'
              label={t(item.label)}
              value={item.value}
              checked={field.value === item.value}
              onChange={onSelectItem}
              {...rest}
            />
          </li>
        ))}
      </ul>
      {meta.touched && meta.error && (
        <Form.Text className='invalid-feedback d-block'>
          {t(meta.error)}
        </Form.Text>
      )}
    </FormikFormGroup>
  );
};

const SingleSelect = ({
  label,
  inputClass = "sign__select",
  options,
  optionIdPrefix,
  withoutTranslation = false,
  onChange,
  ...rest
}) => {
  const { t } = useTranslation();
  const [field, meta] = useField(rest);

  const handleChange = (event) => {
    field.onChange(event);

    if (isFunction(onChange)) onChange(event.target.value);
  };

  return (
    <FormikFormGroup label={label}>
      <Form.Control
        className={`${inputClass}${meta.touched && meta.error ? " error" : ""}${
          field.value === "" ? " text-gray-light-400" : ""
        }`}
        as='select'
        name={field.name}
        value={field.value}
        onChange={handleChange}
        {...rest}
      >
        <option id={`${optionIdPrefix}option-empty`} value='' disabled>
          {t("select-item")}
        </option>

        {options.map((item, index) => (
          <option
            key={index}
            id={`${optionIdPrefix}option-${index}`}
            className='text-white'
            value={item.value}
          >
            {withoutTranslation ? item.label : t(item.label)}
          </option>
        ))}
      </Form.Control>
      {meta.touched && meta.error && (
        <Form.Text className='invalid-feedback d-block'>
          {t(meta.error)}
        </Form.Text>
      )}
    </FormikFormGroup>
  );
};

export {
  TextInput,
  PasswordInput,
  Checkbox,
  RadioGroup,
  SingleSelect,
  LinkInput,
};
