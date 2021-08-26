import React from 'react';
import { Link } from 'react-router-dom';

const UsersTable = ({ users, blogs }) => {
  return (
    <div>
      <h2> Users </h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              blogs created
            </th>
          </tr>
          {users.map(user => {
            const blogAmount = blogs.filter(blog => blog.user.id === user.id).length
            return(
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                  {blogAmount}
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable;