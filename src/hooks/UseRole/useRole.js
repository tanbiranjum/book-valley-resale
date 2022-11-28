import jwt_decode from "jwt-decode";
import { getTokenFromLocalStorage } from "../../utils/utils";

const useRole = () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    const role = "guest";
    return [role];
  }
  let { role } = jwt_decode(token);
  return [role];
};

export default useRole;
