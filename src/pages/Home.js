import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_URL } from "../Utils";

function Home(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(USER_URL)
      .then((response) => {
        setUser(response);
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
          {Object.entries(user).map((tr) => (
            <tr>
              <td>{tr[0]}</td> <td>{tr[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Home;
