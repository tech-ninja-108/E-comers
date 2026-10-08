import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "../feature/Auth/ui/Page/Login";
import Register from "../feature/Auth/ui/Page/Register";
const AppRout = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/login"} replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRout;
