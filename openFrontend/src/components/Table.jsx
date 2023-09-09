import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  
} from "@mui/material";
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination



const TableComponent = () => {
  const [subData, setSubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [totalRows, setTotalRows] = useState(0);

  const handleSubData = async (page, rowsPerPage) => {
    axios
    .get(`${import.meta.env.VITE_SECRET_KEY}openApi/api/submissions`,{
      params: { page, rowsPerPage },
    })
    .then((response) => {
      console.log("Submission Data", response);
      setSubData(response.data.submission_data);
      setTotalRows(response.data.total_rows);
      setLoading(false);
    })
    .catch((errors) => {
      console.error(errors);
      setLoading(false);
    });
  }

  useEffect(() => {
    handleSubData(page + 1, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, fontWeight: 600 }}
      >
        Submissions
      </Typography>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "30rem", width: "60%" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight:900}} >Name</TableCell>
              <TableCell style={{ fontWeight:900}} >Register Number</TableCell>
              <TableCell style={{ fontWeight:900}} >Course Code</TableCell>
              <TableCell style={{ fontWeight:900}} >Choice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Regno}</TableCell>
                <TableCell>{item["Course Code"]}</TableCell>
                <TableCell>{item.Choice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading ? (<LinearProgress />) : (<></>)}
        <div
        style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          padding: '8px',
          borderTop: '1px solid #ddd',
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]} // Customize the rows per page options
          component="div"
          count={totalRows} // Total number of rows
          page={page} // Current page
          onPageChange={handleChangePage} // Handle page change
          rowsPerPage={rowsPerPage} // Rows per page
          onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
        />
        </div>
      </TableContainer>
    </>
  );
};

export default TableComponent;
