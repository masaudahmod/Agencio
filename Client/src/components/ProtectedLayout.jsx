import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../features/api/authSlice";

const ProtectedLayout = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { data: userData } = useGetUserQuery();

  if (userData === undefined || userData === null) {
    return <Navigate to="/login" replace />;
  }

  if (userData) {
    return <Outlet />;
  }

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  if (!isLoggedIn || !user || !userData) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
