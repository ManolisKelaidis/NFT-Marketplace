export const getAuthToken = () => {
  let authToken = null;
  try {
    const storedValue = localStorage.getItem("GALLERY_NFT_AUTH_TOKEN");
    authToken = storedValue != null ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.log(error);
    authToken = null;
  }

  return authToken;
};

export const setAuthToken = (authToken) => {
  try {
    if (authToken) {
      localStorage.setItem(
        "GALLERY_NFT_AUTH_TOKEN",
        JSON.stringify(authToken)
      );
    } else {
      localStorage.removeItem("GALLERY_NFT_AUTH_TOKEN");
    }
  } catch (error) {
    console.log(error);
  }
};

export const setIsAuthorized = (isAuthorized) => {
  try {
    if (isAuthorized) {
      localStorage.setItem(
        "GALLERY_NFT_IS_AUTHORIZED",
        JSON.stringify(isAuthorized)
      );
    } else {
      localStorage.removeItem("GALLERY_NFT_IS_AUTHORIZED");
    }
  } catch (error) {
    console.log(error);
  }
};

export const isAuthorized = () => {
  let isAuth = null;
  try {
    const storedValue = localStorage.getItem("GALLERY_NFT_IS_AUTHORIZED");
    isAuth = storedValue != null ? JSON.parse(storedValue) : false;
  } catch (error) {
    console.log(error);
    isAuth = false;
  }

  return isAuth;
};
