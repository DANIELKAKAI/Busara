import React, { useEffect, useState } from "react";

function FormPage(props) {
  const { page, addToPayload, index } = props;
  const [metaData, setMetaData] = useState({
    local_id: 2057,
    survey_id: page.id,
    start_time: "",
    end_time: "",
    location: {
      accuracy: 0,
      lat: 0,
      lon: 0,
    },
  });
  const [data, setData] = useState({});

  const setLocationandTime = async () => {
    const start = new Date(Date.now());
    await navigator.geolocation.getCurrentPosition((position) => {
      setMetaData({
        ...metaData,
        location: {
          accuracy: position.coords.accuracy,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        start_time: start.toISOString(),
      });
    });
  };

  const createPayload = () => {
    let ans = [];
    for (const item of Object.entries(data)) {
      ans.push(item[1]);
    }
    const payload = { ans: ans, ...metaData };
    addToPayload(payload, index);
  };

  const updateData = (e) => {
    const column_match = e.target.name;
    const q_ans = e.target.value;
    const q_id = e.target.id;
    const index = e.target.dataset.index;

    if (e.target.type === "checkbox") {
      const checkbox = data[index];
      if (e.target.checked) {
        setData({
          ...data,
          [index]: {
            column_match,
            q_ans: checkbox ? [...checkbox.q_ans, q_ans] : [q_ans],
            q_id,
          },
        });
      } else {
        setData({
          ...data,
          [index]: {
            column_match,
            q_ans: [...checkbox.q_ans.filter((q) => q !== q_ans)],
            q_id,
          },
        });
      }
    } else {
      setData({
        ...data,
        [index]: { column_match, q_ans, q_id },
      });
    }
    createPayload();
  };

  useEffect(() => {
    setLocationandTime();
  });

  return (
    <div className="form-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8">
            <form className="form2-horizontal row ">
              {page.sections.map((section) =>
                section.questions.map((q, index) => (
                  <Input
                    updateData={updateData}
                    q={q}
                    index={index}
                    key={index}
                  />
                ))
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input(props) {
  const { q, updateData, index } = props;

  if (q.widget === "select") {
    return (
      <div className="form-group">
        <font size="3">
          <font face="Arial">
            {q.column_match}
            <br />
          </font>
        </font>

        <select
          id={q.id}
          name={q.column_match}
          data-index={index}
          onChange={updateData}
          
          style={{marginBottom:20}}
        >
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
      <div className="form-group">
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
            <label className="text-center">{option.name}</label>
            <br />
          </div>
        ))}
      </div>
    );
  }

  if (q.widget === "article-image") {
    return (
      <div className="form-group">
        <img src={q.description} alt="" width="50px" height="50px" />
      </div>
    );
  }

  return (
    <div className="form-group">
      <font size="3">
        <font face="Arial">
          {q.column_match}
          <br />
        </font>
      </font>
      <input
        className="form-control"
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
