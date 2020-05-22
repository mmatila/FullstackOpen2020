import React from 'react'

const Header = ({ courseName }) => {
    return (
      <h2>{courseName}</h2>
    )
  }
  
  const Content = ({ parts }) => (
    <>
      {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
    </>
  )
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts.map(part => part.exercises)} />
      </div>
    )
  }
  
  const Total = ({ parts }) => (
    <b>total of {parts.reduce((a, b) => a + b)} exercises</b>
  )
  
  const Part = ({ name, exercises }) => (
    <p>{name} {exercises}</p>
  )

  export default Course