import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import UserBanner from "../../components/userBanner/UserBanner";
import UserInfoCard from "./UserInfoCard";
import Profile from "./Profile";

import { retrieveUser } from "../../store/UserSlice";
import TabProvider from "./provider";

const UserDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = params;

  const fetchUser = () => {
    setLoading(true);
    setError(null);

    dispatch(retrieveUser(id))
      .unwrap()
      .then((originalPromiseResult) => {
        setUser(originalPromiseResult.body.data);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        setError(rejectedValueOrSerializedError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <>
      {loading && <div className="text-white h2">Loading...</div>}

      {!loading && error && <div className="text-error h2">User not found</div>}

      {!loading && !error && (
        <TabProvider>
          <UserBanner currentUserId={user._id} user={user}></UserBanner>

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
                <Profile currentUserId={user._id} user={user} />
              </Col>
            </Row>
          </Container>
        </TabProvider>
      )}
    </>
  );
};

export default UserDetails;
