import React, { useState } from "react";
import "../Common/Common.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

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
        price: parseFloat(price),
        currency: currency,
      };

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

  return (
    <div className="center-container addData-container">
      Add Data Component
      <Link to="/">
        {" "}
        <button>Back</button>
      </Link>
      <div>
        <form onSubmit={addEntry}>
          <input
            name="name"
            type="text"
            placeholder="name"
            required
            pattern="[A-Z a-z]*"
            maxLength="30"
            onChange={onInputNameChangeHandler}
          />{" "}
          <br />
          <br />
          <input
            name="price"
            type="number"
            placeholder="price"
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
            name="currency"
            type="text"
            pattern="[A-Za-z]*"
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
    </div>
  );
};
export default AddData;
