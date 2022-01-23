import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Cart from "./Components/Cart/CartLayout";
import Home from "./Pages/HomePage";
import Navbar from "./Components/Navbar/MainNavigation";
import PrivateRoute from "./Components/Routing/PrivateRoute";

import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";



import AddRestaurantPage from "./Pages/AddRestaurantPage";
import { useLocation } from "react-use";
import MyRestaurantPage from "./Pages/MyRestaurantPage";
import ProductsPage from "./Pages/ProductsPage";

function App() {

  let location = useLocation();







  

  return (
    <Router>
      <Fragment>
        {location.pathname !== "/" && <Navbar />}
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route exact path="/create" element={<AddRestaurantPage />} />
          <Route path="/menu" element={<ProductsPage />}/>
          <Route path="/menu/:restaurant" element={<ProductsPage />} />
          
          <Route exact path="/myrestaurant" element={<PrivateRoute />}>
            <Route exact path="/myrestaurant" element={<MyRestaurantPage />} />
          </Route>
          <Route path="/cart" element={<Cart/>} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
