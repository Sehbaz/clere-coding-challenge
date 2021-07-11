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
  }, [productId]);

  /*
  axios.defaults.baseURL = "https://test.clerenet.com/product/";
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      try {
        await axios
          .get(axios.defaults.baseURL + productId, {
            cancelToken: source.token,
          })
          .then((result) => {
            setName(result.data.name);
            setPrice(result.data.price);
            setCurrency(result.data.currency);
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
  }, []);
  */

  const edit = (event) => {
    event.preventDefault();
    const newData = {
      id: productId,
      name: name,
      price: parseFloat(price),
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
            pattern="[A-Z a-z]*"
            onChange={onInputNameChangeHandler}
          />{" "}
          <br />
          <br />
          <input
            name="price"
            type="number"
            placeholder="price"
            value={price}
            min="0.01"
            step="0.01"
            required
            onChange={onInputPriceChangeHandler}
          />{" "}
          <br />
          <br />
          <input
            name="currency"
            type="text"
            pattern="[A-Za-z]*"
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
