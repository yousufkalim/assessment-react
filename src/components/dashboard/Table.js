import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import DialogBox from "./Dialog";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },
});

const AdminTable = ({
  Heading,
  Users,
  page,
  setPage,
  rowsPerPage,
  count,
  loading,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [singleRow, setSingleRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRow = (row) => {
    setSingleRow(row);
    setOpen(true);
  };
  return (
    <div class="content">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {Heading.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {loading ? (
              <div style={{ width: "50%", margin: "auto" }}>
                <h3>Loading...</h3>
              </div>
            ) : (
              <TableBody>
                <>
                  {" "}
                  {Users?.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        onClick={() => handleRow(row)}
                      >
                        {Heading.map((column) => {
                          let value;
                          if (column.id === "user") {
                            value = `${row?.user?.first_name} ${row?.user?.last_name}`;
                          } else {
                            value = row[column.id];
                          }

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>

      <DialogBox
        setSingleRow={setSingleRow}
        singleRow={singleRow}
        open={open}
        setOpen={setOpen}
        Heading={Heading}
      />
    </div>
  );
};

export default AdminTable;
