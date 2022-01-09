import RegisterForm from "../Components/Auth/RegisterForm";
import { useContext } from "react";
import AuthContext from "../Context/auth-context";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  let context = useContext(AuthContext);
  let isAuthenticated = context.isLoggedIn;
  if (!isAuthenticated) {
    return <RegisterForm />;
  } else {
    return <Navigate to="/" />;
  }
};
export default RegisterPage;
