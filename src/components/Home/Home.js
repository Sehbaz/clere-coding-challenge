import React from "react";
import "./Home.css";
import "../Common/Common.css";
import { Link } from "react-router-dom";
import ShowTable from "../ShowTable/ShowTable";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
const Home = () => {
  return (
    <div className="home-container center-container">
      <div>
        {" "}
        <Link to="/addData">
          {" "}
          <button className="submit-btn">
            {" "}
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
          </button>
        </Link>
      </div>

      <div className="table-container">
        <ShowTable />
      </div>
    </div>
  );
};
export default Home;
