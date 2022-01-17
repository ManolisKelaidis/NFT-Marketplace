export const getErrorMessage = (status) => {
  switch (status) {
    case 401:
      return "Unauthorized. Please login to continue.";
    case 404:
      return "Entry not found.";
    default:
      return "An error occured, please try again later.";
  }
};

export const getDefaultMessage = (type, status) => {
  switch (type) {
    case "success":
      return "Success Message.";
    case "error":
      return getErrorMessage(status);
    default:
      return "Default Message.";
  }
};
