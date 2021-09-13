import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SingleUserTable = ({ Heading, singleUserResults }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Heading.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, textAlign: "center" }}
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell style={{ textAlign: "center" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {singleUserResults?.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="center">{row.user?.email}</TableCell>
              <TableCell align="center">{row.domain}</TableCell>
              <TableCell align="center">{row.example_of_job}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {" "}
                <Link
                  to={{
                    pathname: `/singleresult/${row?._id}`,
                  }}
                >
                  {" "}
                  <button>View Result</button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default SingleUserTable;
