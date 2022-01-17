import React, { createContext, useContext, useState } from "react";
import Loader from "../../components/Loader/Loader";

const Context = createContext(null);

const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{ loading, setLoading }}>
      <Loader loading={loading}>{children}</Loader>
    </Context.Provider>
  );
};

export const useLoader = () => useContext(Context);

export default LoaderProvider;
