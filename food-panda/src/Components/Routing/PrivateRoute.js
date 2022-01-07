import React, { useState } from 'react';
import { Navigate, Outlet,useLocation } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import AuthContext from '../../Context/auth-context';

const PrivateRoute = () => {
  
  let location = useLocation();
  let context =  useContext(AuthContext);  
  let isAuthenticated = context.isLoggedIn;
  
  

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }
  else{
    console.log("Redirected");
    return <Outlet />;
  }

  
}
export default PrivateRoute;