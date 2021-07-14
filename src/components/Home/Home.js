import React from "react";
import "./Home.css";
import "../Common/Common.css";
import { Link } from "react-router-dom";
import ShowTable from "../ShowTable/ShowTable";
const Home = () => {
  return (
    <div className="home-container center-container">
      <div>
        {" "}
        <h1 className="title">Product Details </h1>
      </div>
      <div>
        {" "}
        <Link to="/addData">
          {" "}
          <button className="submit-btn">ADD</button>
        </Link>
      </div>

      <div className="table-container">
        <ShowTable />
      </div>
    </div>
  );
};
export default Home;
