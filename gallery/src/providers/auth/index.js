import React, { useReducer, useContext } from "react";

import Context, { DispatchContext } from "./context";
import { isAuthorized, setIsAuthorized } from "../../helpers/auth";

const uId = "userId_1";

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      setIsAuthorized(true);
      return { ...state, isAuthorized: true, authUserId: uId };
    case "logout":
      setIsAuthorized(false);
      return { ...state, isAuthorized: false, authUserId: "" };
    default:
      throw new Error(`unknown action '${action.type}'`);
  }
};

const getInitialState = () => {
  const isAuth = isAuthorized();
  return {
    isAuthorized: isAuth,
    authUserId: isAuth ? uId : "",
    isSetUp: false,
  };
};

const initialState = getInitialState();

const Auth = ({ children }) => {
  /* TBD
   *  use hooks from redux/iData (useSelector, useDispatch)
   *
   *  const reduxDispatch = useDispatch(); // import from redux/iData
   *  const { auth as authState } = useSelector((state)=> state); // import from redux/iData
   *
   *  replace: const [state, dispatch] = useReducer(reducer, initialState);
   *  with: const [state, dispatch] = useReducer(reduxDispatch, authState);
   */
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={state}>{children}</Context.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthSelector = () => useContext(Context);

export const useAuthDispatch = () => useContext(DispatchContext);

export default Auth;
