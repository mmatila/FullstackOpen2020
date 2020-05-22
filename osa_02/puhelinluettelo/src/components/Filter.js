import React from 'react'

const Filter = ({ filter, handler }) => {
    return (
      <div>
        filter results: <input value={filter} onChange={handler} />
      </div>
    )
  }

  export default Filter