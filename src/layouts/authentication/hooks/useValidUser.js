/* eslint-disable camelcase */
import jwt_decode from "jwt-decode";

const useValidUser = () => {
  let isValidUser = false;
  const token = localStorage.getItem("user-token");
  if (token) {
    const decoded = jwt_decode(token);
    if (Date.now() >= decoded.exp * (1 * 3600 * 1000)) {
      return false;
    }
    if (decoded?.email) isValidUser = true;
  }
  return { isValidUser, token };
};

export default useValidUser;
