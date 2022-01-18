import { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Profile from "./Pages/ProfilePage";
import Home from "./Pages/HomePage";
import Navbar from "./Components/Navbar/MainNavigation";
import PrivateRoute from "./Components/Routing/PrivateRoute";

import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";

import AuthContext from "./Context/auth-context";

import AddRestaurantPage from "./Pages/AddRestaurantPage";
import { useLocation } from "react-use";
import MyRestaurantPage from "./Pages/MyRestaurantPage";

function App() {

  let context = useContext(AuthContext);
  let isAuthenticated = context.isLoggedIn;
  let location = useLocation();

  return (
    <Router>
      <Fragment>
       {location.pathname !== "/"  && <Navbar/> } 
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route exact path="/create" element={<AddRestaurantPage/>}/>
          <Route exact path="/myrestaurant" element={<MyRestaurantPage/>}/>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
