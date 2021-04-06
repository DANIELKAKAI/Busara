import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import logoImg from "../img/logo.jpg";
import {
  Card,
  Logo,
  Form,
  Input,
  Button,
  Error,
} from "../components/AuthForms";
import { useAuth } from "../context/auth";
import { LOGIN_URL, ClientId, ClientSecret } from "../Utils";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const referer = props.location.state.referer || "/";

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
          setAuthTokens(result.data.access_token);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  };

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form onSubmit={postLogin}>
        <Input
          type="username"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button type="submit" value="Log In" />
      </Form>
      <Link to="/signup">Don't have an account?</Link>
      {isError && (
        <Error>The username or password provided were incorrect!</Error>
      )}
    </Card>
  );
}

export default Login;
