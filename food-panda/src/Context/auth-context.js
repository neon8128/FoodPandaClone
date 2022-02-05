import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAsync } from "react-use";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  user:"",
  email:"",
  role:"",
  login: (token) => {},
  logout: () => {},
  loading: false,
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  // const [loading,setLoading]=useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    // setLoading(true)
    await axios
      .get("https://localhost:44321/token/get", { withCredentials: true })

      .then((response) => {
        // setLoading(false);
        setToken(response.data.rawData);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }

        return false;
      });
  };

  const parseJwt = (token) => {
    if(token == null) return null;
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const state = useAsync(getUser, []);
  if (state.loading) {
    return <div>Loading</div>;
  }
  
  const userIsLoggedIn = !!token;

  

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };


  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    username: parseJwt(token) ? parseJwt(token).unique_name : null ,
    email:parseJwt(token) ? parseJwt(token).email : null,
    role: parseJwt(token) ? parseJwt(token).role: null,
    login: loginHandler,
    logout: logoutHandler,
    loading: state.loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
