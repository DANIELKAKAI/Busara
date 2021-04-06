import React, { useEffect, useState } from "react";
import axios from "axios";
import { FORM_URL } from "../Utils";
import { useAuth } from "../context/auth";

function Form() {
  const { authTokens } = useAuth();
  const [form, setForm] = useState({
    pages: [
      {
        sections: [
          {
            questions: [{}],
          },
        ],
      },
    ],
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

  /* const getInputs = () => {
    //console.log(form);
    let inputs = [];
    form.pages.map((page) => {
      page.sections.map((section) => {
        section.questions.map((q) => {
          inputs.append(in)
        });
      });
    });
  }; */

  return (
    <div>
      <h2>Form</h2>
      <button onClick={() => getForm()}>get form</button>
      <form>
        {form.pages.map((page) =>
          page.sections.map((section) =>
            section.questions.map((q) => {
              if (q.widget == "select") {
                return (
                  <div>
                    <font size="3">
                      <font face="Arial">
                        {q.column_match}
                        <br />
                      </font>
                    </font>

                    <select value={q.default} id={q.column_match}>
                      {q.q_options.map((option) => (
                        <option value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                );
              }

              return (
                <div>
                  <font size="3">
                    <font face="Arial">
                      {q.column_match}
                      <br />
                    </font>
                  </font>
                  <input type={q.type} value={q.default} id={q.column_match} />
                </div>
              );
            })
          )
        )}
      </form>
    </div>
  );
}

export default Form;
