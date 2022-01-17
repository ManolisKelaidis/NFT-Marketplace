import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { retrieveUser } from "../../store/UserSlice";
import UserInfoCard from "../../pages/UserDetails/UserInfoCard";
import NewCertificationForm from "./NewCertificationForm";
import TabProvider from "../../pages/UserDetails/provider";
import bgImg from "../../assets/img/bg/bg.png";

const AddCertification = () => {
  const { t } = useTranslation();
  const { userId } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const fetchUser = () => {
    dispatch(retrieveUser(userId))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
        setUser(originalPromiseResult.body.data);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("user", user);
  console.log("id", userId);

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
              <h2>{t("new-certification-page.title")}</h2>
            </div>

            <NewCertificationForm />
          </Col>
        </Row>
      </Container>
    </TabProvider>
  );
};

export default AddCertification;
