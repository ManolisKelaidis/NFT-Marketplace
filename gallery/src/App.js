import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";

import ScrollToTop from "./components/router/ScrollToTop";

import AuthMiddleware from "./routes/middlewares/authMiddleware";
import { publicRoutes, authRoutes } from "./routes/allRoutes";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";

import NotifyProvider from "./providers/notify";

function App() {
  return (
    <Router>
      <NotifyProvider>
        <ScrollToTop />

        <Switch>
          {publicRoutes.map((route, idx) => (
            <AuthMiddleware
              key={idx}
              path={route.path}
              layout={PublicLayout}
              component={route.component}
              isRouteProtected={false}
              exact
            />
          ))}

          {authRoutes.map((route, idy) => (
            <AuthMiddleware
              key={idy}
              path={route.path}
              layout={AuthLayout}
              component={route.component}
              isRouteProtected={true}
              exact
            />
          ))}

          <Redirect to="/pages-404" />
        </Switch>
      </NotifyProvider>
    </Router>
  );
}

export default App;
