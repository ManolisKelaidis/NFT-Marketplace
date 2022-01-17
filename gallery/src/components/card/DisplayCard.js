import React from "react";
import ethereumImage from "../../assets/img/Ethereum-icon-purple.svg";

const views = {
  Padded: {
    image: ethereumImage,
  },
  Contained: {
    image: ethereumImage,
  },
  Covered: {
    image: ethereumImage,
  }
};

const DisplayCard = ({ display, description }) => {

  return (
    <div className='display__card p-2 mr-1'>
      <img className='mt-1 ml-1' src={views["Padded"].image} alt="padded" />
      <div className='text-white pl-2 text-center'>
        {display}
        <div className='text-muted'>{description}</div>
      </div>
    </div>
  );
};

export default DisplayCard;
