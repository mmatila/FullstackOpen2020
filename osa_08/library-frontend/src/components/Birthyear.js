import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SET_BIRTHYEAR } from "../mutations";
import { ALL_AUTHORS } from "../queries";

const Birthyear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

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
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Birthyear;
