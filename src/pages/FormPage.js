import React, { useEffect, useState } from "react";

function FormPage(props) {
  const { page, addToPayload, index } = props;
  const [metaData, setMetaData] = useState({
    local_id: 2057,
    survey_id: `${page.id}`,
    start_time: "2021-02-03 11:27:37.739 +0300",
    end_time: "2021-02-03 11:35:16.649 +0300",
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
        start_time:start.toISOString()
      });
    });
  };

  const createPayload = () => {
    let ans = [];
    for (const [key, value] of Object.entries(data)) {
      ans.push(value);
    }
    const payload = { ans: ans, ...metaData };
    addToPayload(payload, index);
  };

  const updateData = (e) => {
    const column_match = e.target.name;
    const q_ans = e.target.value;
    const q_id = e.target.id;

    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setData({
          ...data,
          [e.target.dataset.index]: { column_match, q_ans, q_id },
        });
      }
    } else {
      setData({
        ...data,
        [e.target.dataset.index]: { column_match, q_ans, q_id },
      });
    }
    createPayload();
  };

  useEffect(() => {
    setLocationandTime();
  }, []);

  return (
    <div>
      <h2>Form {index + 1}</h2>
      <form>
        {page.sections.map((section) =>
          section.questions.map((q, index) => (
            <Input updateData={updateData} q={q} index={index} />
          ))
        )}
      </form>
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
          className="form-control"
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

        {q.q_options.map((option, index) => (
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
    return <img src={q.description} alt="article image" width="300px" height="300px" />;
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
