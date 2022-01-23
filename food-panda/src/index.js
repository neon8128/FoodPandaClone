import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/auth-context";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import CartReducer from "./features/CartSlice";

const store = configureStore({
  reducer:{
    cart:CartReducer
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
