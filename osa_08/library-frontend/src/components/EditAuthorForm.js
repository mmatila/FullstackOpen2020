import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries';

const EditAuthorForm = ({ authors }) => {
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: {
      name,
      setBornTo: born
    } });

    setName('');
    setBorn('');
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((a, index) =>
              <option key={index} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(parseInt(target.value))} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default EditAuthorForm;