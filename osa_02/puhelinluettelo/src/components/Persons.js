import React from 'react'
import Contact from './Contact'



const Persons = ({ persons, ignore, removePerson }) => {

    return (
        persons
        .filter(ignore)
          .map(person => <Contact key={person.id} person={person} removePerson={removePerson} />)
    )
  }

  export default Persons