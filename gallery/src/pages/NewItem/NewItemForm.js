import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Row, Col, Button } from "react-bootstrap";

import FormikForm from "../../components/form/FormikForm";
import {
  TextInput,
  SingleSelect,
  RadioGroup,
} from "../../components/form/FormikFields";

import { itemRoyalties, itemTypes } from "../../constants/items";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("validation.required.item-name"),
  description: Yup.string().required("validation.required.description"),
  royalties: Yup.string()
    .oneOf(
      itemRoyalties.map((d) => d.value),
      "validation.required.royalties"
    )
    .required("validation.required.royalties"),
  size: Yup.string().required("validation.required.size"),
  properties: Yup.string().required("validation.required.properties"),
  type: Yup.string()
    .oneOf(
      itemTypes.map((d) => d.value),
      "validation.required.type"
    )
    .required("validation.required.type"),
});

const CreateItemForm = () => {
  const { t } = useTranslation();

  const formModel = {
    name: "",
    description: "",
    royalties: "",
    size: "",
    properties: "",
    type: "",
  };

  const onSubmit = (values) => {
    console.log("onSubmit", values);
  };

  return (
    <FormikForm
      initialValues={formModel}
      validationSchema={validationSchema}
      formClasses="sign__form--create"
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Row className="w-100">
        <Col className="col-12">
          <h4 className="sign__title">{t("upload-file")}</h4>
        </Col>

        <Col className="col-12">
          <div className="sign__file">
            <label id="file1" htmlFor="sign__file-upload">
              {t("new-item-page.form.placeholder.upload-file")}
            </label>

            <input
              data-name="#file1"
              id="sign__file-upload"
              name="file"
              className="sign__file-upload"
              type="file"
              accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg"
            />
          </div>
        </Col>

        <Col className="col-12">
          <h4 className="sign__title">{t("item-details")}</h4>
        </Col>

        <Col className="col-12">
          <TextInput
            name="name"
            label="form.item-name"
            placeholder={t("new-item-page.form.placeholder.item-name")}
          />
        </Col>

        <Col className="col-12">
          <TextInput
            name="description"
            label="form.description"
            placeholder={t("new-item-page.form.placeholder.description")}
            inputClass="sign__textarea"
            as="textarea"
            rows="4"
          />
        </Col>

        <Col className="col-12 col-md-4">
          <SingleSelect
            name="royalties"
            options={itemRoyalties}
            label="form.royalties"
            optionIdPrefix="royalties"
            withoutTranslation={true}
          />
        </Col>

        <Col className="col-12 col-md-4">
          <TextInput
            name="size"
            label="form.size"
            placeholder={t("new-item-page.form.placeholder.size")}
          />
        </Col>

        <Col className="col-12 col-md-4">
          <TextInput
            name="properties"
            label="form.properties"
            placeholder={t("new-item-page.form.placeholder.properties")}
          />
        </Col>

        <Col className="col-12">
          <RadioGroup name="type" options={itemTypes} itemIdPrefix="type" />
        </Col>

        <Col className="col-12 col-xl-3">
          <Button className="sign__btn" variant="primary" type="submit">
            {t("create-item")}
          </Button>
        </Col>
      </Row>
    </FormikForm>
  );
};

export default CreateItemForm;
