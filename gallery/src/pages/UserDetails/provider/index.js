import { createContext, useContext, useState, useMemo } from "react";

const Context = createContext(null);

const Provider = ({ children }) => {
  const [activeTabKey, setActiveTabKey] = useState("tab-1");
  const isSettingsClicked = useMemo(
    () => activeTabKey === "tab-6",
    [activeTabKey]
  );
  const state = { isSettingsClicked, activeTabKey, setActiveTabKey };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export const useTabSelector = () => useContext(Context);

export default Provider;
