import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SET_BIRTHYEAR } from "../mutations";
import { ALL_AUTHORS } from "../queries";
import Select from 'react-select'

const Birthyear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const options = authors.map(author => { return { value: author.name, label: author.name } } )

  const submit = async (event) => {
    event.preventDefault();

    setBirthyear({ variables: { name, born } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select 
            defaultValue={name}
            onChange={({ value }) => setName(value)}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Birthyear;
