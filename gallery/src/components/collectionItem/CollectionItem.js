import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import avatarImg from "../../assets/img/avatars/avatar.jpg";
import { retrieveAssets } from "../../store/AssetSlice";
import ItemCard from "../../components/card/ItemCard";
const CollectionItem = ({ itemId, item, index = 1 }) => {
  const dispatch = useDispatch();
  const [NftList, setNftList] = React.useState({ data: [] });
  const itemDetailsPath = useMemo(() => `/collection/${itemId}`, [itemId]);
  const userDetailsPath = useMemo(
    () => `/user-details/${item.ownerId}`,
    [item.ownerId]
  );

  const image = `http://localhost:3000/public/${item.logo}`;
  const data = { saleType: "PutOnSale" };
  useEffect(async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveAssets(data)
      ).unwrap();
      setNftList(JSON.parse(originalPromiseResult.data));
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }, []);

  const slicedArray = NftList.data.slice(0, 3);
  return (
    <div className="card">
      <Link className="card__cover" to={itemDetailsPath}>
        <img src={image}style={{
            float: "left",
            width: "600px",
            height: "300px",
            backgroundSize: "cover",
          }} alt="cover_not_available" />
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
        {slicedArray.map((index) => {
          return <ItemCard item={index}  />;
        })}
      </div>
      <div className="card__info">
        <div className="card__price">
          <span>Category</span>
          <span>{item.category} </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
