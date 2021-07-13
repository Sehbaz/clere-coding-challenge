import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import "../Common/Common.css";

// EditData() function is used to edit records
const EditData = () => {
  // Setting up variable to change as per state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [invalidCurrencyIndicator, setInvalidCurrencyIndicator] =
    useState("none");

  //useLocation() method for getting productID from parent component
  const location = useLocation();
  const productId = location.state.productId;

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

  // Fetching record from databased based on productID
  useEffect(() => {
    axios
      .get(`https://test.clerenet.com/product/` + productId)
      .then((result) => {
        setName(result.data.name);
        setPrice(result.data.price);
        setCurrency(result.data.currency);
      });
  }, [productId]);

  // Edit function is to enter any changed entry to database with refer to productID
  const edit = (event) => {
    event.preventDefault();

    if (validateCurrencyCode(currency.toUpperCase())) {
      // code that should run when the currencycode is valid
      setInvalidCurrencyIndicator("none");

      const newData = {
        id: productId,
        name: name,
        price: parseFloat(price),
        currency: currency,
      };

      axios.put(`https://test.clerenet.com/product`, newData).then((res) => {});
      history.push("/");
    } else {
      setInvalidCurrencyIndicator("block");
    }
  };

  return (
    <div className="center-container form-data-container">
      <h1 className="title">Edit product</h1>
      <Link to="/">
        {" "}
        <button>Back</button>
      </Link>

      <form onSubmit={edit} className="card-input">
        <div className="input-wrapper">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="name"
            className="inputField"
            required
            pattern="[A-Z a-z]*"
            maxLength="30"
            onChange={onInputNameChangeHandler}
          />{" "}
          <br />
          <br />
          <label className="label">Price</label>
          <input
            name="price"
            type="number"
            placeholder="price"
            value={price}
            className="inputField"
            min="0.01"
            step="0.01"
            max="1000000.00"
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
            PLease enter correct curreny format
          </span>
          <input
            name="currency"
            type="text"
            pattern="[A-Za-z]*"
            value={currency}
            placeholder="currency"
            className="inputField"
            required
            onChange={onInputCurrencyChangeHandler}
          />{" "}
          <br />
          <br />
        </div>
        <button type="submit" value="Submit" className="submit-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
};
export default EditData;
