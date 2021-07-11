import React, { useState } from "react";
import "../Common/Common.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const AddData = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
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

  const addEntry = (e) => {
    e.preventDefault();
    const newEntry = { name: name, price: parseInt(price), currency: currency };
    axios.post(`https://test.clerenet.com/product`, newEntry).then((res) => {});
    history.push("/");
    console.log(newEntry);
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
            onChange={onInputNameChangeHandler}
          />{" "}
          <br />
          <br />
          <input
            name="price"
            type="number"
            placeholder="price"
            required
            onChange={onInputPriceChangeHandler}
          />{" "}
          <br />
          <br />
          <input
            name="currency"
            type="text"
            placeholder="currency"
            required
            onChange={onInputCurrencyChangeHandler}
          />{" "}
          <br />
          <br />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddData;
