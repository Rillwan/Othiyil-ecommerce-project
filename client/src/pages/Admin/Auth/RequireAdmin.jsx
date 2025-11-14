import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuthInit from "../../../Hooks/useTokenAPI";

const RequireAdmin = ({ children }) => {
  const { admin, loading, token } = useSelector((state) => state.auth);
  useAuthInit(); // token verification on mount

  if (loading) return <div>Checking authentication...</div>;
  if (!token) return <Navigate to="/admin-login" replace />;
  if (!admin?.email) return <Navigate to="/admin-login" replace />;
  if (admin?.role !== "admin") return <Navigate to="/not-authorized" replace />;

  return children;
};

export default RequireAdmin;
