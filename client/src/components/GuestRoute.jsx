import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const GuestRoute = () => {
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;