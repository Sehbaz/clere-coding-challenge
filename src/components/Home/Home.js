import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      Hello from Home Component
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
              <td>Sehbaz</td>
              <td>10 GBP</td>
              <td>Edit | Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;
