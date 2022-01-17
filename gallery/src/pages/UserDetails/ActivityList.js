import React from "react";
import { Row, Col } from "react-bootstrap";

import ActivityFilters from "./ActivityFilters";
import ActivityItem from "../../components/card/ActivityItem";

import getActivityList from "../../constants/activityList";

const activityItems = getActivityList();

const ActivityList = () => {
  return (
    <Row>
      <Col className="col-12 col-xl-4 order-xl-2">
        <ActivityFilters />
      </Col>

      <Col className="col-12 col-xl-8 order-xl-1">
        <Row className="row--grid">
          {activityItems.map((data, index) => (
            <Col key={index} className="col-12 col-lg-6 col-xl-12">
              <ActivityItem activity={data} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ActivityList;
