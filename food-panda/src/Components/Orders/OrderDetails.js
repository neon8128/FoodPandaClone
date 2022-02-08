import React, { useContext, useEffect, useState } from 'react';
import {
  TableContainer, Table, TableHead,
  TableBody, TableRow, TableCell
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import AuthContext from '../../Context/auth-context';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({

  root: {
      "& .MuiTableCell-head": {
          paddingTop:"6em",
      },
  }
});

const columns = [
  {
    id: 'imagePath',
    label: ''
  },
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'price',
    label: 'Price'
  },
  {
    id: 'quantity',
    label: 'Quantity'
  },
]

const styles = {
  fontSize: '16px',
  width: '10%'
};

const formatText = (columnName, columnValue) => {
  switch(columnName) {
    case 'price':
      return `${columnValue} RON`;
    case 'imagePath':
      return <img src={columnValue} width={250} />;
    default:
      return columnValue;
  }
}

const OrderDetails = ({ id }) => {
  
    const [orderItems, SetItems] = useState([]);
    const classes = useStyles();
    
    const context = useContext(AuthContext);
    const token = context.token;

    const getData = async() =>{
        const url = `https://localhost:44321/order/getorder?orderid=${id}`;
        const config = {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          };
           axios.get(url,config)
          .then(res => SetItems(res.data.data.items))
          .catch(res => console.log(res));
    }

  useEffect( () => {
    getData();
  }, []);
  console.log(orderItems);

  return (
    <>
    <TableContainer>
      <Table>

        <TableHead className={classes.root}>
          <TableRow>

            {columns.map((col, pos) => {
              return (
                <TableCell
                  key={pos}
                  style={styles}
                >
                  {col.label}
                </TableCell>
              )
            })}

          </TableRow>
        </TableHead>

        <TableBody>

          {(Array.isArray(orderItems) && orderItems.length > 0) && orderItems.map((row, pos) => {
            return (
              <TableRow key={pos}>

                {columns.map((col, pos) => {
                  const columnName = col.id;
                  const columnValue = row[columnName];

                  return (
                    <TableCell
                      key={pos}
                      style={styles}
                    >
                      {formatText(columnName, columnValue)}
                    </TableCell>
                  )
                })}

              </TableRow>
            )
          })}

        </TableBody>

      </Table>
    </TableContainer>
    </>
  )
}

export default OrderDetails;