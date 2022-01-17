import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthMiddleware = ({
  component: Component,
  layout: Layout,
  isRouteProtected,
  ...rest
}) => {
  const { isAuthorized } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isRouteProtected && !isAuthorized) {
          return (
            <Redirect
              to={{ pathname: "/pages-404", state: { from: props.location } }}
            />
          );
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default AuthMiddleware;
