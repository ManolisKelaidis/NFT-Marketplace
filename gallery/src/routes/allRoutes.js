import React from "react";
import { Redirect } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";
import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import ItemDetails from "../pages/ItemDetails/ItemDetails";
import Users from "../pages/Users/Users";
import UserDetails from "../pages/UserDetails/UserDetails";
import Contact from "../pages/Contact/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import PageError from "../pages/PageError/PageError";
import DefaultExample from "../pages/DefaultExample/DefaultExample";
import DefaultExample2 from "../pages/DefaultExample2/DefaultExample2";
import CreatePassword from "../pages/CreatePassword/CreatePassword";
import ItemsCollection from "../pages/ItemsCollection/ItemsCollection";
import AddCollection from "../pages/AddCollection/AddCollection";
import AllCollections from "../pages/AllCollections/AllCollections";
import LoginWallet from "../pages/Login/LoginWallet";
import Test from "../pages/Tests/frontend";
import AddCertification from "../pages/AddCertification/AddCertification";
import GlobalSearch from "../pages/GlobalSearch/GlobalSearch";
import AddDocument from "../pages/AddDocument/AddDocument"
import NewItem from "../pages/NewItem/NewItem";

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/login-wallet", component: LoginWallet },
  { path: "/createPassword", component: CreatePassword },
  { path: "/register", component: Register },
  { path: "/password-recovery", component: PasswordRecovery },
  { path: "/home", component: Home },
  { path: "/explore", component: Explore },
  { path: "/items/:id", component: ItemDetails },
  { path: "/collection/:id", component: ItemsCollection },
  { path: "/users", component: Users },
  { path: "/user-details/:id", component: UserDetails },
  { path: "/contact", component: Contact },
  { path: "/privacy-policy", component: PrivacyPolicy },
  { path: "/pages-404", component: PageError },
  { path: "/default-example", component: DefaultExample },
  { path: "/default-example-2", component: DefaultExample2 },
  { path: "/test", component: Test },
  { path: "/search", component: GlobalSearch },
  {path:"/new-document", component:AddDocument},
  { path: "/new-collection", component: AddCollection },
  { path: "/collections", component: AllCollections },
  { path: "/new-item", component: NewItem },
  { path: "/new-certification", component: AddCertification },

  {
    path: "/",
    component: () => <Redirect to="/home" />,
  },
];

const authRoutes = [];

export { publicRoutes, authRoutes };
