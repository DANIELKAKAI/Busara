import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getDeviceType, SIGNUP_URL } from "../Utils";

function Signup() {
  const initialData = {
    referral_code: "",
    device_details: { device: getDeviceType() },
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    location: "",
    password1: "",
    password2: "",
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
        if (response.status === 201) {
          alert("account created: " + JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.Error || JSON.stringify(error.response.data));
      });
  };

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
              <form onSubmit={postData} className="form-horizontal">
                <h3 className="title">Sign UP</h3>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Full name"
                    name="full_name"
                    value={data.full_name}
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
                    value={data.username}
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
                    value={data.email}
                    onChange={updateData}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Phone number"
                    name="phone_number"
                    value={data.phone_number}
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
                    value={data.location}
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
                    value={data.password1}
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
                    value={data.password2}
                    onChange={updateData}
                    required
                  />
                </div>
                <div className="form-group">
                  <input type="submit" value="submit" className="btn submit" />
                </div>
              </form>
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
