import { useHistory } from "react-router";

import { useNotify } from "../providers/notify";

export const useError = () => {
  const history = useHistory();
  const { showNotification } = useNotify();

  const handleError = ({ message = "", status = 0 }) => {
    switch (status) {
      case 401:
        showNotification({ type: "error", message, status });
        history.push("/login", { isNotifyPersist: true });
        break;
      default:
        showNotification({ type: "error", message, status });
        break;
    }
  };

  return { handleError };
};

export default useError;
