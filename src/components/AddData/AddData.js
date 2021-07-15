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

      try {
        // Using axios.post() method to add a new record
        axios
          .post(`https://test.clerenet.com/product`, newEntry)
          .then((res) => {});

        // Routing
        history.push("/");
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    } else {
      setInvalidCurrencyIndicator("block");
    }
  };

  return (
    <div className="center-container form-data-container">
      <h1 className="title">Add product</h1>
      <div className="back-btn-container">
        {" "}
        <Link to="/">
          {" "}
          <button className="back-btn">CANCEL</button>
        </Link>
      </div>

      <form onSubmit={addEntry} className="card-input">
        <label className="label">Name</label>
        <div className="input-wrapper">
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
            placeholder="999.99"
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
          <span
            style={{ display: invalidCurrencyIndicator }}
            className="label-error"
          >
            Please enter correct curreny format
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
        </div>
        <button type="submit" value="Submit" className="blue-btn">
          SUBMIT
        </button>
      </form>
    </div>
  );
};
export default AddData;
