import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useLocation } from "react-router";
import { ToastProvider, useToasts } from "react-toast-notifications";

import { getDefaultMessage } from "./helpers";

const Context = createContext(null);

const NotifyProvider = ({ children }) => {
  const location = useLocation();
  const { addToast, removeAllToasts } = useToasts();

  const showNotification = useCallback(
    ({ type = "info", message = "", status = 0 }) => {
      removeAllToasts();

      // const translatedMessage = t(message || getDefaultMessage(type, status));

      addToast(message || getDefaultMessage(type, status), {
        appearance: type,
      });
    },
    [addToast, removeAllToasts]
  );

  const hideNotification = useCallback(() => {
    removeAllToasts();
  }, [removeAllToasts]);

  useEffect(() => {
    if (
      !location.state ||
      (location.state && !location.state.isNotifyPersist)
    ) {
      removeAllToasts();
    }
  }, [location, removeAllToasts]);

  return (
    <Context.Provider value={{ showNotification, hideNotification }}>
      {children}
    </Context.Provider>
  );
};

const ToastNotifyProvider = ({ children }) => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000}>
      <NotifyProvider>{children}</NotifyProvider>
    </ToastProvider>
  );
};

export const useNotify = () => useContext(Context);

export default ToastNotifyProvider;
