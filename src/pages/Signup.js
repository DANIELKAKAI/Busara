import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, Button } from "../components/AuthForms";
import { getDeviceType, SIGNUP_URL } from "../Utils";

function Signup() {
  const initialData = {
    referral_code: "",
    device_details: { device: getDeviceType() },
  };

  const [data, setData] = useState(initialData);

  const updateData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const postData = (e) => {
    e.preventDefault();
    console.log(data);

    axios
      .post(SIGNUP_URL, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card>
      <h2>SignUp</h2>

      <Form onSubmit={postData}>
        <Input
          type="text"
          placeholder="Full name"
          name="full_name"
          onChange={updateData}
        />
        <Input
          type="text"
          placeholder="username"
          name="username"
          onChange={updateData}
        />
        <Input
          type="email"
          placeholder="email"
          name="email"
          onChange={updateData}
        />
        <Input
          type="text"
          placeholder="Phone number"
          name="phone_number"
          onChange={updateData}
        />
        <Input
          type="text"
          placeholder="location"
          name="location"
          onChange={updateData}
        />
        <Input
          type="password"
          placeholder="password"
          name="password1"
          onChange={updateData}
        />
        <Input
          type="password"
          placeholder="password again"
          name="password2"
          onChange={updateData}
        />
        <Button type="submit">SignUp</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;
