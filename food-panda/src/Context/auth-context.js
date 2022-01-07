import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAsync } from 'react-use';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  loading:false,
});



export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
 // const [loading,setLoading]=useState(false);

  const getUser = async() =>{
   // setLoading(true)
    await axios.get("https://localhost:44321/token/get",{ withCredentials: true })
    
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
        console.log('Error', error.message);
    }

    return false;
});
  }
  // useEffect(()=> {
 
  //   getUser();
 
  // },[])
  const state= useAsync(getUser,[]);

  if(state.loading) {return <div>Loading</div> }
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
    loading:state.loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;