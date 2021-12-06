import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},

});



export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const tokenHandler = async() =>{

   const response= await axios("https://localhost:44321/token/get", {
      method: "GET",
      withCredentials: true,
    });
              
    
    setToken(response.data);

  }
 
  const userIsLoggedIn = !!(token||tokenHandler());

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