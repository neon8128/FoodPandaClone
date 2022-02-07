
import React from 'react';
import {
  TableContainer, Table, TableHead,
  TableRow, TableBody, TableCell
} from '@material-ui/core';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    id: 'orderCreatedDate',
    lable: 'Order Date'
  },
  {
    id: 'documentID',
    lable: 'Order ID'
  },
  {
    id: 'orderTotal',
    lable: 'Amount'
  }
];

const styles = {
  fontSize: '16px',
  cursor: 'pointer',
  width: '10%'
};
const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case 'orderTotal':
      return `£${columnValue}`;
    case 'orderCreatedDate':
      return moment(columnValue).format('DD/MM/YYYY')
    default:
      return columnValue;
  }
};
const Received = ({ orders }) =>{
 const navigate = useNavigate();
  console.log(orders);
 if(orders != null)
  {return (
    <TableContainer>
      <Table>

        <TableHead>
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
            const { documentID } = row;

            return (
              <TableRow
                key={pos}
                onClick={() => navigate(`/order/${documentID}`)}
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
export default Received;