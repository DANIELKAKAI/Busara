import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { USER_URL } from "../Utils";
import { AuthContext } from "../context/auth";

function Home(props) {
  const [user, setUser] = useState({});
  const [authToken] = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(USER_URL, {
        headers: {
          Authorization: `Bearer ${
            authToken || localStorage.getItem("authToken")
          }`,
        },
      })
      .then((response) => {
        //console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          alert("Unauthorized log in");
        }
      });
  });

  return (
    <div>
      <h2>User Info</h2>
      <table className="table table-success table-striped">
        <tbody>
          <tr>
            <td>Full Name</td> <td>{user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{user.phone_number}</td>
          </tr>
          <tr>
            <td>Referral Code</td>
            <td>{user.referral_code}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Home;
