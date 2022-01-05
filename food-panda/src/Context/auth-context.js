import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},

});



export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  useEffect = async() =>{

    await axios.get("https://localhost:44321/token/get",{ withCredentials: true })
    
        .then((response) => {
          setToken(response.data.rawData);
        })
        .catch((error) => {
        // Error 😨
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
           
        } else if (error.request) {

          console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return false;
    });
   

  }
 
  const  userIsLoggedIn = !!token;

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