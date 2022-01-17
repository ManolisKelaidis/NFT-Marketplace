import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import coverImg from "../../assets/img/cover/cover1.jpg";

const ActivityItem = ({ activity }) => {
  const itemDetailsPath = useMemo(
    () => `/items/${activity.item._id}`,
    [activity]
  );

  const userDetailsPath = useMemo(
    () => `/user-details/${activity.user._id}`,
    [activity]
  );

  return (
    <div className="activity">
      <Link to={itemDetailsPath} className="activity__cover">
        <img src={coverImg} alt="not_available" />
      </Link>

      <div className="activity__content">
        <h3 className="activity__title">
          <Link to={itemDetailsPath}>{activity.item.title}</Link>
        </h3>

        <p className="activity__text">
          listed by <Link to={userDetailsPath}>{activity.user.nickname}</Link>{" "}
          <br />
          for <b>{activity.item.price} ETH</b>
        </p>

        <span className="activity__time">{activity.createdAt}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
