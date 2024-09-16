import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Spinner from "../loader/Spinner";

const ProtectedRoute = () => {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
      setLoadingAuth(false);
    };
    authenticate();
  }, [checkAuth]);

  if (loadingAuth) {
    return (
      <div className='h-[70vh] flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoute;
