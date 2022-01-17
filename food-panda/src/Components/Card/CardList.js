import { useAsync } from "react-use";
import { useEffect, useState } from "react";
import Card from "./CardComponent";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



const CardList = (props) => {
 console.log(props);
  return(
    <Box p={5} pt={15} minHeight="100vh">
  <Grid container spacing={5}>       
    {props.results.map((mediaCard, i) => {
      return (
        <Grid key={i} item>
          <Card {...mediaCard} />
        </Grid>
      );
    })}
  </Grid>
</Box>
      
);
};

export default CardList;
