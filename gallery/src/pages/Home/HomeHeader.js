import React from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const Intro = () => {
  return (
    <div className="home">
      <Container>
        <Row>
          <div className="col-12">
            <div className="home__content home__content--center">
              <h1 className="home__title">
                Discover, collect, and sell <br />
                extraordinary{" "}
                <span>
                  <b>NFTs</b>
                </span>
              </h1>
              <p className="home__text">
                Digital marketplace for crypto collectibles and non-fungible
                tokens.
              </p>

              <div className="home__btns">
                <Link to="/explore" className="home__btn home__btn--clr">
                  Explore
                </Link>
                <Link to="/new-item" className="home__btn">
                  Create
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
