import React from "react";
import { useHistory } from "react-router-dom";
import { isFunction } from "formik";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProtectedButton = ({ onClick, children, ...rest }) => {
  const { isAuthorized } = useSelector((state) => state.auth);
  const history = useHistory();

  const handleOnClick = () => {
    if (isFunction(onClick)) {
      if (isAuthorized) onClick();
      else history.push("/login");
    }
  };

  return (
    <Button onClick={handleOnClick} {...rest}>
      {children}
    </Button>
  );
};

export default ProtectedButton;
