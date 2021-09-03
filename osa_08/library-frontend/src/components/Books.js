import React, { useEffect, useState } from 'react'
import _ from 'lodash';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState(null);
  const result = useQuery(ALL_BOOKS);

  const genres = books.map(book => book.genres);
  const flattened = _.flatten(genres);
  const uniques = _.uniq(flattened)

  const filteredBooks = filter
    ? books.filter(book => book.genres.includes(filter))
    : books

  useEffect(() => {
    if (result.data && result.data.allBooks !== null) setBooks(result.data.allBooks);
  }, [result])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map((b, index) =>
            <tr key={index}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {uniques.map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>)}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books