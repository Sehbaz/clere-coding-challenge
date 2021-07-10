import React, { useState, useEffect } from "react";
import "../Common/Common.css";
import { Link } from "react-router-dom";
import axios from "axios";
const ShowTable = () => {
  const [data, setData] = useState([]);
  const getAllData = () => {
    axios.get(`https://test.clerenet.com/product`).then((result) => {
      setData(result.data);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);
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
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>
                  {row.price}
                  {row.currency}
                </td>
                <td>
                  {" "}
                  <Link to="/editData">
                    {" "}
                    <button>Edit</button>
                  </Link>
                  <button>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ShowTable;
