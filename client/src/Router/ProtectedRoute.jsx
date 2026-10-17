import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Loading from "../share/NavBar/ui/pages/Loading";

const ProtectedRoute = ({ role }) => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (!user?.data) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.data.role;

  if (role && userRole !== role) {
    return (
      <Navigate to={userRole === "seller" ? "/seller/home" : "/home"} replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
