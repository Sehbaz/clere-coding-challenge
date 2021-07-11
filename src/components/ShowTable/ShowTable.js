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
    let mounted = true;
    axios.get(`https://test.clerenet.com/product`).then((result) => {
      if (mounted === true) {
        setData(result.data);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, [getAllData]);

  const deleteRecord = (e) => {
    axios
      .delete("https://test.clerenet.com/product/" + e)
      .then(() => getAllData());
  };
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
                  <Link
                    to={{
                      pathname: "/editData",
                      state: {
                        productId: row.id,
                      },
                    }}
                  >
                    <button>Edit</button>
                  </Link>
                  <button onClick={deleteRecord.bind(this, row.id)}>
                    DELETE
                  </button>
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
