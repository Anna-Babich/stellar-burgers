import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';
import React from 'react';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.data);
  const location = useLocation();

  if (!isAuthChecked) {
    console.log('isAuthChecked:', isAuthChecked);
    console.log('user:', user);
    console.log('onlyUnAuth:', onlyUnAuth);
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    console.log('isAuthChecked:', isAuthChecked);
    console.log('user:', user);
    console.log('onlyUnAuth:', onlyUnAuth);
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    console.log('isAuthChecked:', isAuthChecked);
    console.log('user:', user);
    console.log('onlyUnAuth:', onlyUnAuth);
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};

export default ProtectedRoute;
