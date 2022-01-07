import { Fragment,useContext } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import Profile from './Pages/ProfilePage';
import Home from './Pages/HomePage';
import Navbar from './Components/Layout/Layout';
import PrivateRoute from "./Components/Routing/PrivateRoute"
import AuthContext from './Context/auth-context';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';



 function App() {

  
  const context = useContext(AuthContext);  
  const isAuthenticated = context.isLoggedIn;


  return (
    <Router>
      <Fragment>
        {isAuthenticated && <Navbar/> }
        <Routes>
          <Route exact path='/' isAuth={isAuthenticated} element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
