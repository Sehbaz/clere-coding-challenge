import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import { ReactComponent as NoData } from "../../Image/noDataImg.svg";
import "../Common/Common.css";
import "./ShowTable.css";

//Default API endpoint
axios.defaults.baseURL = "https://test.clerenet.com/product";
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

//  Table Pagination button function
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

//Showing all the records
const ShowTable = () => {
  const [data, setData] = useState([]);
  const [dataIndicator, setDataIndicator] = useState("none");
  const [noDataIndicator, setNoDataIndicator] = useState("block");

  //Fetching all the records from database
  const getAllData = () => {
    axios
      .get(axios.defaults.baseURL)
      .then((res) => {
        setData(res.data);
        if (res.data.length < 1) {
          setDataIndicator("none");
          setNoDataIndicator("block");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      try {
        await axios
          .get(axios.defaults.baseURL, {
            cancelToken: source.token,
          })
          .then((res) => {
            setData(res.data);

            // Changing view based on the data from API endpoint
            if (res.data.length > 0) {
              setDataIndicator("block");
              setNoDataIndicator("none");
            }
          });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };

    fetchUsers();
    return () => {
      source.cancel();
    };
  }, [data]);

  //Deleting the record from databse by ID
  const deleteRecord = (e) => {
    setOpen(true);
    axios
      .delete("https://test.clerenet.com/product/" + e)
      .then(() => getAllData());
  };

  //Pagination for table recrods
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Snackbar function on delete button pressed
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className="main-container">
      <div style={{ display: noDataIndicator }}>
        {" "}
        <div className="no-data-container" style={{ color: "#57606f" }}>
          {" "}
          <Typography variant="h5" gutterBottom>
            start by adding first product 📦
          </Typography>
          <NoData width="100%" height="100%" />
        </div>
      </div>
      <div style={{ display: dataIndicator }}>
        <div>
          {" "}
          <h1 className="title">Product Details </h1>
        </div>
        <TableContainer>
          <Table aria-label="custom pagination table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left" component="th" scope="row">
                  Name
                </TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row) => (
                <TableRow key={row.id} className="data-row">
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    {row.price} <span className="capi">{row.currency}</span>
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <Link
                        to={{
                          pathname: "/editData",
                          state: {
                            productId: row.id,
                          },
                        }}
                      >
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <span onClick={deleteRecord.bind(this, row.id)}>
                        {" "}
                        <IconButton aria-label="delete" color="secondary">
                          {" "}
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>

      <Snackbar open={open} autoHideDuration={600} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Deleted succesfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ShowTable;
