import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/auth-context';
import { useContext } from 'react';

function PrivateRoute ({ children, ...rest }) {
    const context = useContext(AuthContext);
    const isAuthenticated = context.isLoggedIn;
    return (
      <Route {...rest} render={() => {
        return isAuthenticated === true
          ? children
          : <Redirect to='/login' />
      }} />
    )
  }

export default PrivateRoute;