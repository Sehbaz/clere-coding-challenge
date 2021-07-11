import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import "../Common/Common.css";
const EditData = () => {
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

  const location = useLocation();
  const productId = location.state.productId;
  useEffect(() => {
    axios
      .get(`https://test.clerenet.com/product/` + productId)
      .then((result) => {
        setName(result.data.name);
        setPrice(result.data.price);
        setCurrency(result.data.currency);
      });
  }, []);
  const edit = (event) => {
    const newData = {
      id: productId,
      name: name,
      price: parseInt(price),
      currency: currency,
    };

    axios.put(`https://test.clerenet.com/product`, newData).then((res) => {});
    history.push("/");
  };

  return (
    <div className="center-container">
      Edit Data Component
      <Link to="/">
        {" "}
        <button>Back</button>
      </Link>
      <div>
        <form onSubmit={edit}>
          <input
            name="name"
            type="text"
            value={name}
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
            value={price}
            required
            onChange={onInputPriceChangeHandler}
          />{" "}
          <br />
          <br />
          <input
            name="currency"
            type="text"
            value={currency}
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
export default EditData;
