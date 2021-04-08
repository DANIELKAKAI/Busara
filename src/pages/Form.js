import React, { useEffect, useState } from "react";
import axios from "axios";
import { FORM_URL, SUBMIT_URL } from "../Utils";
import { useAuth } from "../context/auth";
import FormPage from "./FormPage";

function Form(props) {
  const { authTokens } = useAuth();
  const [form, setForm] = useState({
    pages: [],
  });
  const [payload, setPayload] = useState([]);

  const addToPayload = (data,index) => {
    let _payload = payload;
    _payload[index]= data
    setPayload(_payload);
  };

  const getForm = async () => {
    await axios
      .get(FORM_URL, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
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
    console.log(payload);
    axios
      .post(SUBMIT_URL, JSON.stringify(payload), {
        headers: {
          Authorization: `Bearer ${authTokens}`,
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
  }, []);

  return (
    <div className="container">
      <h2>Forms</h2>
      {form.pages.map((page,index) => (
        <FormPage page={page} addToPayload={addToPayload} index={index} />
      ))}
      <button className="btn btn-primary" onClick={(e) => postForm()}>
        submit
      </button>
    </div>
  );
}

export default Form;
