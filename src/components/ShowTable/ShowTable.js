import React from "react";
import "../Common/Common.css";
import { Link } from "react-router-dom";
const ShowTable = () => {
  return (
    <div>
      Show table component
      <div>
        <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sehbaz Rafik</td>
              <td>10 GBP</td>
              <td>
                {" "}
                <Link to="/editData">
                  {" "}
                  <button>Edit</button>
                </Link>
                <button>DELETE</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sehbaz Faiz</td>
              <td>10 GBP</td>
              <td>
                {" "}
                <Link to="/editData">
                  {" "}
                  <button>Edit</button>
                </Link>{" "}
                <button>DELETE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ShowTable;
