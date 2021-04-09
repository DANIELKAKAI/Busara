import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FORM_URL, SUBMIT_URL } from "../Utils";
import FormPage from "./FormPage";
import { AuthContext } from "../context/auth";

function Form(props) {
  const [form, setForm] = useState({
    pages: [],
  });
  const [payload, setPayload] = useState([]);
  const [authToken] = useContext(AuthContext);

  const addToPayload = (data, index) => {
    let _payload = payload;
    _payload[index] = data;
    setPayload(_payload);
  };

  const getForm = () => {
    axios
      .get(FORM_URL, {
        headers: {
          Authorization: `Bearer ${
            authToken || localStorage.getItem("authToken")
          }`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setForm(response.data.forms[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          alert("Unauthorized log in");
        }
      });
  };

  const postForm = () => {
    let _payload = payload;

    //set survey end time
    const end = new Date(Date.now());
    _payload.map((item) => (item.end_time = end.toISOString()));

    console.log(_payload);

    axios
      .post(SUBMIT_URL, JSON.stringify(_payload), {
        headers: {
          Authorization: `Bearer ${
            authToken || localStorage.getItem("authToken")
          }`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response, response.status);
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert("status: " + error.response.status);
      });
  };

  useEffect(() => {
    getForm();
  });

  return (
    <div className="container">
      {form.pages.map((page, index) => (
        <FormPage page={page} addToPayload={addToPayload} index={index} />
      ))}
      <br />
      <button className="btn btn-primary" onClick={(e) => postForm()}>
        submit
      </button>
    </div>
  );
}

export default Form;
