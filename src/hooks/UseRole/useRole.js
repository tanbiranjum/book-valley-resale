import jwt_decode from "jwt-decode";
import { getTokenFromLocalStorage } from "../../utils/utils";

const useRole = () => {
  let { role, email } = jwt_decode(getTokenFromLocalStorage());
  return [role, email];
};

export default useRole;
