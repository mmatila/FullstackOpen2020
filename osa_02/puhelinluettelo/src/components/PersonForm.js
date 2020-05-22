import React from 'react'

const PersonForm = ({ personAdd, nameHandler, name, numberHandler, number }) => {
    return (
      <form onSubmit={personAdd}>
        <div>
          name: <input onChange={nameHandler} value={name} />
        </div>
        <div>
          number: <input onChange={numberHandler} value={number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm