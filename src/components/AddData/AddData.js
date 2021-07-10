import React from "react";
import "../Common/Common.css";
import { Link } from "react-router-dom";
const AddData = () => {
  return (
    <div className="center-container addData-container">
      Add Data Component
      <Link to="/">
        {" "}
        <button>Back</button>
      </Link>
      <div>
        <form>
          <input name="name" type="text" placeholder="name" /> <br />
          <br />
          <input name="price" type="number" placeholder="price" /> <br />
          <br />
          <input name="currency" type="text" placeholder="currency" /> <br />
          <br />
          <Link to="/">
            {" "}
            <button type="submit" value="Submit">
              Submit
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default AddData;
