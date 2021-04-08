import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
        //console.log(response);
        if (response.status === 200){
          alert("account created");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.Error);
      });
  };

  return (
    <div className="container">
      <h2>SignUp</h2>

      <form onSubmit={postData}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Full name"
            name="full_name"
            onChange={updateData}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="username"
            name="username"
            onChange={updateData}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="email"
            name="email"
            onChange={updateData}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Phone number"
            name="phone_number"
            onChange={updateData}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="location"
            name="location"
            onChange={updateData}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="password"
            name="password1"
            onChange={updateData}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="password again"
            name="password2"
            onChange={updateData}
            required
          />
        </div>
        <input className="btn btn-primary" value="submit" type="submit" />
      </form>
      <Link to="/login">Log In</Link>
    </div>
  );
}

export default Signup;
