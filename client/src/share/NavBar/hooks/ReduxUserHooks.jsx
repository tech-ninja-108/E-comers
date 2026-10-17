import { useSelector } from "react-redux";

export const useAccessToken = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return accessToken;
};


