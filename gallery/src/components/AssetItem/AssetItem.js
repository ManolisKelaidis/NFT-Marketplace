import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import ShareButtons from "../../pages/ItemDetails/ShareButtons";
import ProtectedButton from "../button/ProtectedButton";
import { ReactComponent as LikeIcon } from "../../assets/img/icons/like.svg";

const AssetItem = ({ onSomething, itemDetails, likes }) => {
   const image = `http://localhost:3000${itemDetails.file}`;
  return (
    <Col xl="8">
      <div className="asset__item">
        <Link className="asset__img" to={image}>
          {/* TODO: Magnific Popup */}
          <img
            style={{
              float: "left",
              width: "300px",
              height: "300px",
              "backgroundSize": "cover",
            }}
            src={image}
            alt="item-img"
          />
        </Link>

        <ShareButtons />
        <ProtectedButton
          className="asset__likes p-0"
          variant="empty"
          onClick={onSomething}
        >
          <LikeIcon />
          <span>{likes}</span>
        </ProtectedButton>
      </div>
    </Col>
  );
};

export default AssetItem;
