import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/user/useAuth';
import { useEffect } from 'react';
import AdminProvider from '../context/admin/AdminContext';

export default function AdminRoutes() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    document.title = 'MerchNinja - Admin';
  }, []);

  useEffect(() => {
    // if (!isAdmin) navigate("/");
  }, [navigate, isAdmin]);

  return (
    <AdminProvider>
      <Outlet />
    </AdminProvider>
  );
}
