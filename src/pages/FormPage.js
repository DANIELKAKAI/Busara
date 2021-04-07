import React, { useEffect, useState } from "react";
import axios from "axios";
import { FORM_URL } from "../Utils";
import { useAuth } from "../context/auth";

function FormPage(props) {
  const { page } = props;
  const { authTokens } = useAuth();
  const [metaData, setMetaData] = useState({
    local_id: 0,
    survey_id: page.id,
    start_time: Date.now(),
  });
  const [data, setData] = useState({});

  const postForm = () => {
    //e.preventDefault();
    console.log(data);
  };

  const updateData = (e) => {
    const column_match = e.target.name;
    const q_ans = e.target.value;
    const q_id = e.target.id;

    if (e.target.type == "checkbox") {
      if (e.target.checked) {
        setData({...data,[e.target.dataset.index]:{ column_match, q_ans, q_id }});
      }
      return true;
    }
    setData({...data,[e.target.dataset.index]:{ column_match, q_ans, q_id }});
    console.log(data);
  };


  return (
    <div>
      <h2>{page.description}</h2>
      <form>
        {page.sections.map((section) =>
          section.questions.map((q,index) => (
            <Input updateData={updateData} q={q} index={index} />
          ))
        )}
      </form>
      <button onClick={(e) => postForm()}>submit</button>
    </div>
  );
}

function Input(props) {
  const { q, updateData,index } = props;

  if (q.widget === "select") {
    return (
      <div>
        <font size="3">
          <font face="Arial">
            {q.column_match}
            <br />
          </font>
        </font>

        <select id={q.id} name={q.column_match} data-index={index} onChange={updateData}>
          <option disabled selected value>
            {" "}
            -- select an option --{" "}
          </option>
          {q.q_options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (q.widget === "multiselect") {
    return (
      <div>
        <font size="3">
          <font face="Arial">
            {q.column_match}
            <br />
          </font>
        </font>

        {q.q_options.map((option) => (
          <div key={option.id}>
            <input
              type="checkbox"
              id={q.id}
              name={q.column_match}
              value={option.id}
              onChange={updateData}
              data-index={index}
            />
            <label>{option.name}</label>
            <br />
          </div>
        ))}
      </div>
    );
  }

  if (q.widget === "article-image") {
    return <img src={q.description} />;
  }

  return (
    <div>
      <font size="3">
        <font face="Arial">
          {q.column_match}
          <br />
        </font>
      </font>
      <input
        type={q.type}
        id={q.id}
        max={q.field_length}
        name={q.column_match}
        onChange={updateData}
        data-index={index}
        required
      />
    </div>
  );
}

export default FormPage;
