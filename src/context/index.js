import React, { createContext, useContext } from "react";

const AppContext = createContext(null);

const useAppCtx = () => useContext(AppContext);

const AppProvider = ({ value, children }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider, useAppCtx };
