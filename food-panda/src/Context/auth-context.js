import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const getToken = async() =>{

 
  const req= await axios.get("https://localhost:5001/token/get");
  const token = req.then( res =>res.data);

             
  return token;
}

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

 
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
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;