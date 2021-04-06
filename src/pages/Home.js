import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_URL } from "../Utils";
import { useAuth } from "../context/auth";

function Home(props) {
  const [user, setUser] = useState({});
  const { authTokens } = useAuth();

  useEffect(() => {
    axios
      .get(
        USER_URL,
        {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        }
      )
      .then((response) => {
        //console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <h2>User Info</h2>
      <table>
        <thead />
        <tbody>
            <tr>
              <td>Full Name</td> <td>{user.name}</td>
            </tr>
            <tr><td>Email</td><td>{user.email}</td></tr>
            <tr><td>Phone Number</td><td>{user.phone_number}</td></tr>
            <tr><td>Referral Code</td><td>{user.referral_code}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
export default Home;
