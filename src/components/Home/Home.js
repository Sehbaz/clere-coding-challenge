import React from "react";
import "./Home.css";
import "../Common/Common.css";
import { Link } from "react-router-dom";
import ShowTable from "../ShowTable/ShowTable";
const Home = () => {
  return (
    <div className="home-container center-container">
      Home Component
      <Link to="/addData">
        {" "}
        <button>ADD</button>
      </Link>
      <div>
        <ShowTable />
      </div>
    </div>
  );
};
export default Home;
