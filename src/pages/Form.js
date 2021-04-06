import React, { useEffect, useState } from "react";
import axios from "axios";
import { FORM_URL } from "../Utils";
import { useAuth } from "../context/auth";


function Form() {
  const { authTokens } = useAuth();

  useEffect(() => {
    axios
      .get(FORM_URL, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      })
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return <h2>Form</h2>;
}

export default Form;
