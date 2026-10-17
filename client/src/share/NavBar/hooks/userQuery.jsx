import { useMutation } from "@tanstack/react-query";
import { userLogout } from "../Api/userHandal";

export const UserLogoutQurey = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};
