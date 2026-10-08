import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../state/thunkAuth";

export const AuthHooks = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSumbit = async (data) => {
    dispatch(loginUser(data));
    console.log(data);
  };

  return {
    handleSubmit,
    register,
    loginSumbit,
    // registerSumbit,
    navigate,
  };
};

export default AuthHooks;
