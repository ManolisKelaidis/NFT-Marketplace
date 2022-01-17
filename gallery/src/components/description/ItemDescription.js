import React from "react";
import pencil from "./../../assets/img/pencil.svg";
import { Button, Image } from "react-bootstrap";
import FormikForm from "./../../components/form/FormikForm";
import { TextInput } from "./../../components/form/FormikFields";
const ItemDescription = ({
  className = "",
  outerClassName,
  innerClassName,
  isEditClicked,
  setIsEditClicked,
  formModel,
  onSubmit,
  asset,
  t,
}) => {
  return (
    <div className={outerClassName}>
      <div className={innerClassName}>
        <button onClick={() => setIsEditClicked(!isEditClicked)}>
          <Image
            style={({ width: "18px" }, { height: "18px" })}
            src={pencil}
          ></Image>
        </button>
        <h2>{t("item-details-page.description")}</h2>
      </div>
      {isEditClicked ? (
        <FormikForm
          initialValues={formModel}
          enableReinitialize
          formClasses="sign__form--profile"
          onSubmit={onSubmit}
        >
          <TextInput
            inputClass="sign__textarea"
            as="textarea"
            name="description"
            rows="4"
            placeholder={asset.description}
          ></TextInput>
          <Button className="sign__btn" variant="primary" type="submit">
            {t("save")}
          </Button>
        </FormikForm>
      ) : (
        <p>{asset.description}</p>
      )}
    </div>
  );
};

export default ItemDescription;
