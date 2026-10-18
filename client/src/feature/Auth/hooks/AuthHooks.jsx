import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, RegisterUser } from "../state/thunkAuth";
import { toast } from "react-toastify";

export const AuthHooks = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerSumbit = async (data) => {
    if (data.password !== data.conformpassword) {
      return toast.error("Password and conformPassword are not match");
    }
    const result = await dispatch(RegisterUser(data)).unwrap();

    console.log(result);

    const user = result.data;
    const role = user.role;
    if (role === "seller") {
      navigate("/seller/home", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
    toast.success(result.message);

    reset();
  };

  const loginSumbit = async (formData) => {
    const result = await dispatch(loginUser(formData)).unwrap();

    const user = result.data;
    const role = user.role;

    if (role === "seller") {
      navigate("/seller/home", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
    toast.success(result.message);

    reset();
  };

  return {
    handleSubmit,
    register,
    loginSumbit,
    registerSumbit,
    navigate,
  };
};

export default AuthHooks;
