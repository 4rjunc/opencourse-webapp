import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import Typography from "@mui/material/Typography";

const TableComponent = () => {
  const [subData, setSubData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SECRET_KEY}openApi/api/submissions`)
      .then((response) => {
        console.log('Submission Data', response);
        setSubData(response.data.submission_data);
      })
      .catch((errors) => {
        console.error(errors);
      });
  }, []);

  return (
    <>
              <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Submissions
          </Typography>
    <TableContainer component={Paper} style={{ maxHeight: '30rem', width:"40rem" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Course Code</TableCell>
            <TableCell>Choice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.Name}</TableCell>
              <TableCell>{item['Course Code']}</TableCell>
              <TableCell>{item.Choice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TableComponent;
