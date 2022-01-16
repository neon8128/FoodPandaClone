import { Navigate } from "react-router-dom";
import LoginForm from "../Components/Auth/LoginForm";
import { useContext } from "react";
import AuthContext from "../Context/auth-context";

const LoginPage = () => {
  let context = useContext(AuthContext);
  let isAuthenticated = context.isLoggedIn;
  if (!isAuthenticated) {
    return <LoginForm />;
  } else {
    console.log("redirect from loginpage");
    return <Navigate to="/" />;
  }
};

export default LoginPage;
