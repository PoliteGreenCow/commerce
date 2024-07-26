// src/components/AdminRoute.tsx

import { useContext } from'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Store } from '../Store';

export default function AdminRoute() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/signin" />;
}
