import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';


import UserProfile from './Components/Profile/UserProfile';
import Login from './Pages/LoginPage';
import Home from './Pages/HomePage';
import Navbar from './Components/Layout/Layout';
import PrivateRoute from "./Components/Routing/PrivateRoute"
import Register from './Components/Auth/RegisterForm';

function App() {
  return (
    <Switch>
      <Route exact path='/login' >
        <Login/>
        </Route>
        <Route exact path='/register' >
        <Register/>
        </Route>
      <Fragment>    
        <Navbar/>
        <PrivateRoute path="/" exact>
          <Home/>
          </PrivateRoute>         
      </Fragment>
    </Switch>
  );
}

export default App;
