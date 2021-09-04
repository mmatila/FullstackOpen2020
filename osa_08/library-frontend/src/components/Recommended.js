import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS, GET_CURRENT_USER } from '../queries';

const Recommended = ({ show }) => {
  const user = useQuery(GET_CURRENT_USER)
  const [getRecommendedBooks, result] = useLazyQuery(ALL_BOOKS)
  const [recommendedBooks, setRecommendedBooks] = useState([])

  useEffect(() => {
    if (result.data) setRecommendedBooks(result.data.allBooks)
  }, [setRecommendedBooks, result])

  useEffect(() => {
    if (user.data) getRecommendedBooks({ variables: { genre: user.data.me?.favoriteGenre } })
  }, [getRecommendedBooks, user])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations for you</h2>
      <p>books from genre: <b>{user.data.me?.favoriteGenre}</b></p>

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
          {recommendedBooks.map((b, index) =>
            <tr key={index}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended;
