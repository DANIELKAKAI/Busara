import React, { useEffect, useState } from "react";
import axios from "axios";
import { FORM_URL } from "../Utils";
import { useAuth } from "../context/auth";
import FormPage from "./FormPage";

function Form() {
  const { authTokens } = useAuth();
  const [form, setForm] = useState({
    pages: [],
  });

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
          console.log(form);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getForm();
  }, []);

  return (
    <div>
      <h2>Forms</h2>
        {form.pages.map((page) => (
          <FormPage page={page} />
        ))}
    </div>
  );
}

export default Form;
