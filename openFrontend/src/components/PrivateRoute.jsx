import { Route,Navigate } from "react-router-dom";

const PrivateRoute = ({elements: Component, ...rest}) => {
  const isAuthenticated = localStorage.getItem("token")

  return (
    <Route
        {...rest}
        elements ={
            isAuthenticated ? (<Component/>) : (<Navigate to="/login"/>)
        }
        />
  )
}

export default PrivateRoute