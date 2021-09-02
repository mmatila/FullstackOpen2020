import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'
import EditAuthorForm from './EditAuthorForm';

const Authors = ({ show, token }) => {
  const [authors, setAuthors] = useState([]);
  const result = useQuery(ALL_AUTHORS);
  
  useEffect(() => {
    if (result.data && result.data.allAuthors !== null) setAuthors(result.data.allAuthors);
  }, [result]);

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token && <EditAuthorForm authors={authors} />}
    </div>
  )
}

export default Authors