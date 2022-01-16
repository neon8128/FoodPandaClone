import { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Profile from "./Pages/ProfilePage";
import Home from "./Pages/HomePage";
import Navbar from "./Components/Navbar/MainNavigation";
import PrivateRoute from "./Components/Routing/PrivateRoute";

import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import AuthContext from "./Context/auth-context";

function App() {

  let context = useContext(AuthContext);
  let isAuthenticated = context.isLoggedIn;

  return (
    <Router>
      <Fragment>
       {isAuthenticated && <Navbar/> } 
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
