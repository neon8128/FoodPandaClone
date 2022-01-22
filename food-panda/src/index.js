import React from "react";
import ReactDOM from "react-dom";


import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/auth-context';
import {CartProvider} from './Context/cart-context';

ReactDOM.render(
  <React.StrictMode>
  <AuthContextProvider> 
  <CartProvider>    
    <App />
    </CartProvider>
  </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
