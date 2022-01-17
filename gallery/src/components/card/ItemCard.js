import React from "react";
// import { useMemo } from "react";
const ItemCard = ({ item }) => {
  // const itemDetailsPath = useMemo(() => `/items/${item._id}`, [item._id]);

  const image = `http://localhost:3000/public/${item.file}`;

  return (
    <div className="d-flex token__card w-25 p-2 mr-1">
      <img
        className="mt-1 ml-1"
        style={{ width: "2.5rem", height: "2.5rem" }}
        src={image}
        alt="name"
      />

      {/* <p className="item__title">
        <Link to={itemDetailsPath}>{item.title}</Link>
      </p> */}

      {/* <div className="text-white pl-2">
        {images[`${name}`].label}
        <div className="text-muted">{name}</div>
      </div> */}
    </div>
  );
};

export default ItemCard;
