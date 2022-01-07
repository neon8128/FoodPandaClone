import axios from "axios";
import { useEffect, useState,useContext } from "react";
import AuthContext from '../../Context/auth-context';

import Grid from "@mui/material/Grid";

const HomeComponent = () => {
 
  return(
    <Grid container component="main" sx={{ height: "100vh" }}>
    <h1>This is the homepage</h1>
    </Grid>
  );
};

export default HomeComponent;
