import React from "react";

import NavBar from "./../../components/navbar/NavBar";
import Footer from "./../../components/footer/Footer";

import "../layout.scss";

const AuthLayout = ({ children }) => {
  return (
    <>
      <NavBar />

      <main className="main">{children}</main>

      <Footer />
    </>
  );
};

export default AuthLayout;
