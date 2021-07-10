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
export default EditData;
