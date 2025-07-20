import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../features/api/authSlice";

const ProtectedLayout = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: userData } = useGetUserQuery();

  if (userData === undefined) {
    navigate("/login");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  } else if (userData === null) {
    navigate("/login");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Error loading user data</p>
      </div>
    );
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
