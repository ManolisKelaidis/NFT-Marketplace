import React from "react";
import ethereumImage from "../../assets/img/Ethereum-icon-purple.svg";

const images = {
  Ethereum: {
    image: ethereumImage,
    label: "ETH",
  },
  Wethereum: {
    image: ethereumImage,
    label: "WETH",
  },
  Pethereum: {
    image: ethereumImage,
    label: "PETH",
  },
  Kethereum: {
    image: ethereumImage,
    label: "KETH",
  },
};

const TokenCard = ({ name }) => {
  return (
    <div className="d-flex token__card w-25 p-2 mr-1">
      <img
        className="mt-1 ml-1"
        style={{ width: "2.5rem", height: "2.5rem" }}
        src={images[`${name}`].image}
        alt="name"
      />
      <div className="text-white pl-2">
        {images[`${name}`].label}
        <div className="text-muted">{name}</div>
      </div>
    </div>
  );
};

export default TokenCard;
