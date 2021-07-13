import React, { useState } from "react";
import "../Common/Common.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  makeStyles,
  TextField,
  withStyles,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./AddData.css";

/*
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#ffbf00",
    },

    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ffbf00",
      },
    },
  },
})(TextField);
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#ffbf00",
    "&:hover": {
      backgroundColor: "#ffbf00",
    },
  },
}))(Button);

const CancelButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#c9382a",
    "&:hover": {
      backgroundColor: "#c9382a",
    },
    textDecoration: "none",
  },
}))(Button);

*/
//AddData function to add a new record to database
const AddData = () => {
  // Setting up variable to change as per state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [invalidCurrencyIndicator, setInvalidCurrencyIndicator] =
    useState("none");

  // using history for navigation
  let history = useHistory();

  //node module use for validation user currency input
  var validateCurrencyCode = require("validate-currency-code");

  //Changing name variable on change
  const onInputNameChangeHandler = (e) => {
    setName(e.target.value);
  };

  //Changing price variable on change
  const onInputPriceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  //Changing currency variable on change
  const onInputCurrencyChangeHandler = (e) => {
    setCurrency(e.target.value);
  };

  // On click ADD button this function will trigger to add new record on database
  const addEntry = (e) => {
    //preventing default action of form
    e.preventDefault();
    if (validateCurrencyCode(currency.toUpperCase())) {
      // code that should run when the currencycode is valid
      setInvalidCurrencyIndicator("none");

      //Create a new object
      const newEntry = {
        name: name,
        price: parseFloat(price).toFixed(2),
        currency: currency,
      };
      const p = parseFloat(price);
      console.log(p.toFixed(2));
      // Using axios.post() method to add a new record
      axios
        .post(`https://test.clerenet.com/product`, newEntry)
        .then((res) => {});

      // Routing
      history.push("/");
    } else {
      setInvalidCurrencyIndicator("block");
    }
  };
  /*
   Add Data Component
      <Link to="/">
        {" "}
        <button>Back</button>
      </Link>
      <div>
        <form onSubmit={addEntry}>
          <input
            
            type="text"
            placeholder="name"
            name="name"
            required
            pattern="[A-Z a-z]*"
            maxLength="30"
            onChange={onInputNameChangeHandler}
          />{" "}
          <br />
          <br />
          <input
          
            type="number"
            placeholder="price"
              name="price"
            min="0.01"
            max="1000000.00"
            step="0.01"
            required
            onChange={onInputPriceChangeHandler}
          />{" "}
          <br />
          <br />
          <span style={{ display: invalidCurrencyIndicator }}>
            PLease enter correct curreny format
          </span>
          <input
           
            type="text"
            pattern="[A-Za-z]*"
             name="currency"
            placeholder="currency"
            required
            onChange={onInputCurrencyChangeHandler}
          />{" "}
          <br />
          <br />
          <button type="submit" value="Submit">
            SUBMIT
          </button>
        </form>
      </div>
      <div>


      ---------------

      <Card className={classes.root} variant="outlined">
        <CardContent>
          <form onSubmit={addEntry}>
            <h1>📒 Add Record</h1>
            <CssTextField
              className={classes.margin}
              label="Name"
              variant="outlined"
              id="custom-css-outlined-input"
              name="name"
              required
              pattern="[A-Z a-z]*"
              inputProps={{
                maxLength: 22,
              }}
              onChange={onInputNameChangeHandler}
              fullWidth
            />
            <br />
            <CssTextField
              className={classes.margin}
              label="Price"
              variant="outlined"
              id="custom-css-outlined-input"
              name="price"
              inputProps={{
                maxLength: 9,
                step: "2",
              }}
              required
              onChange={onInputPriceChangeHandler}
              fullWidth
            />
            <br />
            <CssTextField
              className={classes.margin}
              label="Currency"
              variant="outlined"
              id="custom-css-outlined-input"
              pattern="[A-Za-z]*"
              name="currency"
              placeholder="currency"
              required
              onChange={onInputCurrencyChangeHandler}
              fullWidth
            />

            <br />
            <span style={{ display: invalidCurrencyIndicator }}>
              <FormHelperText id="component-error-text">
                {" "}
                please enter correct curreny format
              </FormHelperText>
            </span>
            <br />

            <div>
              <ColorButton
                variant="contained"
                color="primary"
                className={classes.margin}
                fullWidth
                size="large"
                type="submit"
              >
                Add record
              </ColorButton>{" "}
            </div>
          </form>
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <CancelButton
              variant="contained"
              color="primary"
              className={classes.margin}
              size="large"
              fullWidth
            >
              <Typography variant="button" component="h2">
                Cancel
              </Typography>
            </CancelButton>
          </Link>
        </CardContent>
      </Card>
  */
  return (
    <div className="center-container addData-container">
      <div className="card-input">
        <form onSubmit={addEntry}>
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Macbook"
            name="name"
            required
            pattern="[A-Z a-z]*"
            className="inputField"
            maxLength="30"
            onChange={onInputNameChangeHandler}
          />{" "}
          <br />
          <br />
          <label className="label">Price</label>
          <input
            type="number"
            className="inputField"
            placeholder="10.99"
            name="price"
            min="0.01"
            max="1000000.00"
            step="0.01"
            required
            onChange={onInputPriceChangeHandler}
          />{" "}
          <br />
          <br />
          <label className="label">Currency</label>
          <span style={{ display: invalidCurrencyIndicator }}>
            PLease enter correct curreny format
          </span>
          <input
            type="text"
            pattern="[A-Za-z]*"
            className="inputField"
            name="currency"
            placeholder="GBP"
            required
            onChange={onInputCurrencyChangeHandler}
          />{" "}
          <br />
          <br />
          <button type="submit" value="Submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddData;
