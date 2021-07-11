import React, { useState, useEffect } from "react";
import "../Common/Common.css";
import "./ShowTable.css";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://test.clerenet.com/product";
const ShowTable = () => {
  const [data, setData] = useState([]);
  const [dataIndicator, setDataIndicator] = useState("none");
  const [noDataIndicator, setNoDataIndicator] = useState("block");

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

  /*
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
  */

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
