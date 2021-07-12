import React, { useState } from "react";
import "../Common/Common.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const AddData = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [invalidCurrencyIndicator, setInvalidCurrencyIndicator] =
    useState("none");

  let history = useHistory();

  const onInputNameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const onInputPriceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const onInputCurrencyChangeHandler = (e) => {
    setCurrency(e.target.value);
  };
  var validateCurrencyCode = require("validate-currency-code");

  const addEntry = (e) => {
    e.preventDefault();
    if (validateCurrencyCode(currency.toUpperCase())) {
      // code that should run when the currencycode is valid
      setInvalidCurrencyIndicator("none");
      const newEntry = {
        name: name,
        price: parseFloat(price),
        currency: currency,
      };

      axios
        .post(`https://test.clerenet.com/product`, newEntry)
        .then((res) => {});
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
