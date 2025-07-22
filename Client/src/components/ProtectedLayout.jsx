import { Form, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../features/api/authSlice";

const ProtectedLayout = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { data: userData, isLoading } = useGetUserQuery();
  
  if (isLoading) {
    return <div className="text-center py-20">Checking authentication...</div>;
  }

  if (userData === undefined || userData === null) {
    return <Navigate to="/login" replace={true} />;
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
