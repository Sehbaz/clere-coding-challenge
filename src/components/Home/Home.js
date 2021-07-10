import React from "react";
import "./Home.css";
import "../Common/Common.css";
const Home = () => {
  return (
    <div className="home-container center-container">
      Home Component
      <button>ADD</button>
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
                <button>EDIT</button> <button>DELETE</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sehbaz Faiz</td>
              <td>10 GBP</td>
              <td>
                {" "}
                <button>EDIT</button> <button>DELETE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;
