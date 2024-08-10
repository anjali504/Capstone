import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, organizer, admin } = useContext(AuthContext);

  if (user || organizer || admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
