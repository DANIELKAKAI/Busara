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
      });
  };

  const postForm = () => {
    const end = new Date(Date.now());
    let _payload = payload;

    _payload.map((item) => (item.end_time = end.toISOString()));

    console.log(_payload);

    axios
      .post(SUBMIT_URL, JSON.stringify(_payload), {
        headers: {
          Authorization: `Bearer ${
            authToken || localStorage.getItem("authToken")
          }`,
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
        alert(error.response.data.Error);
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
