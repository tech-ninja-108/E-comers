import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "../feature/Auth/ui/Page/Login";
import Register from "../feature/Auth/ui/Page/Register";
import Home from "../feature/Product/ui/pages/Home";
import SellerHome from "../feature/sellerProduct/ui/pages/SellerHome";
import SellerProducts from "../feature/sellerProduct/ui/pages/SellerProducts";
import SellerLayout from "../feature/sellerProduct/ui/pages/SellerLayout";
import SellerOrders from "../feature/sellerProduct/ui/pages/SellerOrders";
import SellerPayments from "../feature/sellerProduct/ui/pages/SellerPayments";
import SellerProfile from "../feature/sellerProduct/ui/pages/SellerProfile";
import SellerSettings from "../feature/sellerProduct/ui/pages/SellerSettings";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authme } from "../feature/Auth/state/thunkAuth";
import ProtectedRoute from "./ProtectedRoute";
import SingleProduct from "../feature/Product/ui/pages/SingleProduct";
const AppRout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authme());
  }, []);

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
    {
      element: <ProtectedRoute role="user" />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/products/:id",
          element: <SingleProduct />,
        },
      ],
    },
    {
      element: <ProtectedRoute role="seller" />,
      children: [
        {
          path: "/seller",
          element: <SellerLayout />,
          children: [
            {
              index: true,
              element: <Navigate to={"home"} replace />,
            },
            {
              path: "home",
              element: <SellerHome />,
            },
            {
              path: "products",
              element: <SellerProducts />,
            },
            {
              path: "orders",
              element: <SellerOrders />,
            },
            {
              path: "payments",
              element: <SellerPayments />,
            },
            {
              path: "profile",
              element: <SellerProfile />,
            },
            {
              path: "settings",
              element: <SellerSettings />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRout;
