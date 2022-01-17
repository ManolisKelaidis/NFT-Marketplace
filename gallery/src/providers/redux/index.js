import React from "react";
import { Provider } from "react-redux";

import reduxStore from "../../store";

const ReduxProvider = ({ children }) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};

export default ReduxProvider;
