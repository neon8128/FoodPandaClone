import { Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import UserProfile from './Components/Profile/UserProfile';
import Login from './Pages/LoginPage';
import Home from './Pages/HomePage';
import Navbar from './Components/Layout/Layout';
import PrivateRoute from "./Components/Routing/PrivateRoute"

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}/>
          <Route exact path='/' element={<Home/>}/>         
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
