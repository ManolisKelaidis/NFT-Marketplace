import React from "react";

const SocialItem = ({ path, icon: ComponentIcon }) => {
  return (
    <a href={path} target="_blank" rel="noreferrer">
      <ComponentIcon />
    </a>
  );
};

export default SocialItem;
