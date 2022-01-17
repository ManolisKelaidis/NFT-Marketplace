import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { LinkInput } from "../../components/form/FormikFields";

const ProfileSocialMediaForm = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col className="col-12">
        <h4 className="sign__title">Link your social media</h4>
      </Col>

      <Col>
        <LinkInput
          className="sign__input col-md-8"
          name="mysiteId"
          image="site"
          placeholder={t("new-item-page.form.placeholder.your-site")}
        />
        <LinkInput
          className="sign__input col-md-8"
          name="facebookId"
          image="facebook"
          placeholder={t("new-item-page.form.placeholder.your-facebook")}
        />
        <LinkInput
          className="sign__input col-md-8"
          name="twitterId"
          image="twitter"
          placeholder={t("new-item-page.form.placeholder.your-twitter")}
        />
        <LinkInput
          className="sign__input col-md-8"
          name="instagramId"
          image="instagram"
          placeholder={t("new-item-page.form.placeholder.your-instagram")}
        />
      </Col>
    </Row>
  );
};

export default ProfileSocialMediaForm;
