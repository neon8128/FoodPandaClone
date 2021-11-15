import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../Context/auth-context';
import { useContext } from 'react';

const PrivateRoute = () => {
    const authContext = useContext(AuthContext); 
    const isLoggedIn = authContext.isLoggedIn;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;