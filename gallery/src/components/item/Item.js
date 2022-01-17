import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import ProtectedButton from "../button/ProtectedButton";
import avatarImg from "../../assets/img/avatars/avatar.jpg";
import { updateAsset } from "../../store/AssetSlice";
import { useDispatch } from "react-redux";
import { ReactComponent as LikeIcon } from "../../assets/img/icons/like.svg";

const Item = ({ itemId, item, index = 1 }) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(item.likes);

  const itemDetailsPath = useMemo(() => `/items/${itemId}`, [itemId]);
  const userDetailsPath = useMemo(
    () => `/user-details/${item.ownerId}`,
    [item.ownerId]
  );
  console.log(item.encryptedFiles)
  const image = `http://localhost:3000${item.file}`;

  const onLikeItem = async () => {
    var tempLikes = parseInt(likes);
    tempLikes += 1;

    setLikes(tempLikes.toString());

    try {
      /*const originalPromiseResult*/ await dispatch(
        updateAsset({
          assetId: item._id,
          data: {
            title: item.title,
            description: item.description,
            owner: item.owner,
            saleType: item.saleType,
            file: item.file,
            price: item.price,
            likes: tempLikes,
          },
        })
      ).unwrap();
    } catch (rejectedValueOrSerializedError) {}
  };

  return (
    <div className="card">
      <Link className="card__cover" to={itemDetailsPath}>
        <img
          src={image}
          style={{
            float: "left",
            width: "600px",
            height: "300px",
            backgroundSize: "cover",
          }}
          alt="cover_not_available"
        />
      </Link>

      <h3 className="card__title">
        <Link to={itemDetailsPath}>{item.title}</Link>
      </h3>

      <div
        className={`card__author${
          item.verified ? " card__author--verified" : ""
        }`}
      >
        <img src={avatarImg} alt="avatar_not_available" />
        <Link to={userDetailsPath}>{item.owner}</Link>
      </div>

      <div className="card__info">
        <div className="card__price">
          <span>Reserve price</span>
          <span>{item.price} ETH</span>
        </div>

        <ProtectedButton
          className="card__likes p-0"
          variant="empty"
          onClick={onLikeItem}
        >
          <LikeIcon />
          <span>{likes}</span>
        </ProtectedButton>
      </div>
    </div>
  );
};

export default Item;
