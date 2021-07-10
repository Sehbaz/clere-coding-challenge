import React from "react";
import { Link } from "react-router-dom";
import "../Common/Common.css";
const EditData = () => {
  return (
    <div className="center-container">
      Edit Data Component
      <Link to="/">
        {" "}
        <button>Back</button>
      </Link>
      <div>
        <form>
          <input name="name" type="text" placeholder="name" required /> <br />
          <br />
          <input name="price" type="number" placeholder="price" required />{" "}
          <br />
          <br />
          <input
            name="currency"
            type="text"
            placeholder="currency"
            required
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
