import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified and user role doesn't match, redirect to home
  if (role && user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;