import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";

import UserInfoCard from "../../pages/UserDetails/UserInfoCard";
import NewItemForm from "./NewItemForm";
import CreateItem from "./CreateItem";
import { useSelector } from "react-redux";
import { useState } from "react";

import bgImg from "../../assets/img/bg/bg.png";
import TabProvider from "../../pages/UserDetails/provider";
const NewItem = () => {
  const { t } = useTranslation();
  const { userId } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});

  return (
    <TabProvider>
      <div
        className="main__author bg-img"
        style={{ background: `url(${bgImg}) center center / cover no-repeat` }}
      ></div>

      <Container>
        <Row className="row--grid">
          <Col className="col-12 col-xl-3">
            <UserInfoCard
              userId={user._id}
              user={user}
              isUserCilckable={false}
            />
          </Col>

          <Col className="col-12 col-xl-9">
            <div className="main__title main__title--create">
              <h2>{t("new-item-page.title")}</h2>
            </div>

            <CreateItem />
          </Col>
        </Row>
      </Container>
    </TabProvider>
  );
};

export default NewItem;
