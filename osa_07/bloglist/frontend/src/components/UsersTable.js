import React from 'react';

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
                  {user.name}
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