
import React from 'react';
import {
  TableContainer, Table, TableHead,
  TableRow, TableBody, TableCell
} from '@material-ui/core';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const columns = [
  {
    id: 'time',
    lable: 'Order Date'
  },
  {
    id: 'id',
    lable: 'Order ID'
  },
  {
    id: 'totalPrice',
    lable: 'Amount'
  }
];

const styles = {
  fontSize: '16px',
  cursor: 'pointer',
  width: '10%'
};
const useStyles = makeStyles({

  root: {
      "& .MuiTableCell-head": {
          paddingTop:"6em",
      },
  }
});
const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case 'totalPrice':
      return `${columnValue} RON`;
    default:
      return columnValue;
  }
};
const OrderTable = ({ orders }) =>{
 const navigate = useNavigate();

 const classes = useStyles();

 if(orders != null)
  {return (
    <TableContainer>
      <Table>

        <TableHead className={classes.root} >
          <TableRow>
            {columns.map((column, pos) => {
              const { lable } = column;

              return (
                <TableCell
                  key={pos}
                  style={styles}
                >
                  {lable}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>

        <TableBody>

          {(Array.isArray(orders) && orders.length > 0) && orders.map((row, pos) => {
            const { id } = row;

            return (
              <TableRow
                key={pos}
                onClick={() => navigate(`/orders/${id}`)}
              >

                {columns.map((column, pos) => {
                  const columnName = column.id;
                  const columnValue = row[columnName];
                  const formattedText = formatText(columnName, columnValue);

                  return (
                    <TableCell
                      key={pos}
                      style={styles}
                    >
                      {formattedText}
                    </TableCell>
                  )
                })}

              </TableRow>
            )
          })}

        </TableBody>

      </Table>
    </TableContainer>
        
  )}
  else return <div>Loading</div>

}
export default OrderTable;