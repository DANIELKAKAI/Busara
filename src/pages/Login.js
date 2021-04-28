import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth";
import { LOGIN_URL, ClientId, ClientSecret } from "../Utils";

function Login(props) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useContext(AuthContext);

  const postLogin = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", "password");

    axios
      .post(LOGIN_URL, params, {
        auth: {
          username: ClientId,
          password: ClientSecret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setAuthToken(result.data.access_token);
          localStorage.setItem("authToken", result.data.access_token);
        }
      })
      .catch((error) => {
        //console.log(error.response);
        alert(JSON.stringify(error.response.data));
      });
  };

  if (authToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
            <div className="form-container">
              <div className="form-icon">
                <span>
                  <i className="fa fa-user"></i>
                </span>
              </div>

              <form onSubmit={postLogin} className="form-horizontal">
                <h3 className="title">Log In</h3>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={username}
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn submit"
                    value="Log In"
                  />
                </div>
              </form>
              <Link to="/signup">Don't have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
