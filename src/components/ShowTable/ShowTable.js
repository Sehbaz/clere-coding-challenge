import React, { useState, useEffect } from "react";
import "../Common/Common.css";
import "./ShowTable.css";
import { Link } from "react-router-dom";
import axios from "axios";

//Default API endpoint
axios.defaults.baseURL = "https://test.clerenet.com/product";

//Showing all the records
const ShowTable = () => {
  const [data, setData] = useState([]);
  const [dataIndicator, setDataIndicator] = useState("none");
  const [noDataIndicator, setNoDataIndicator] = useState("block");

  //Fetching all the records from database
  const getAllData = () => {
    axios
      .get(axios.defaults.baseURL)
      .then((res) => {
        setData(res.data);
        if (res.data.length < 1) {
          setDataIndicator("none");
          setNoDataIndicator("block");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      try {
        await axios
          .get(axios.defaults.baseURL, {
            cancelToken: source.token,
          })
          .then((res) => {
            setData(res.data);
            if (res.data.length > 0) {
              setDataIndicator("block");
              setNoDataIndicator("none");
            }
          });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };

    fetchUsers();
    return () => {
      source.cancel();
    };
  }, [data]);

  //Deleting the record from databse by ID
  const deleteRecord = (e) => {
    axios
      .delete("https://test.clerenet.com/product/" + e)
      .then(() => getAllData());
  };

  return (
    <div>
      Show table component
      <div style={{ display: noDataIndicator }}>
        {" "}
        No Data in database recieved
      </div>
      <div style={{ display: dataIndicator }}>
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
                  <span className="capi">{row.currency}</span>
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
