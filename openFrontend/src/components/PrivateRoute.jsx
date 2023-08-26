import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAthenticated  = localStorage.getItem("token");
  return isAthenticated ? children : <Navigate to="/"/>
}

export default PrivateRoute