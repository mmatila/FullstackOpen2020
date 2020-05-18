import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part text1={props.parts[0].name} count1={props.parts[0].exercises}></Part>
      <Part text2={props.parts[1].name} count2={props.parts[1].exercises}></Part>
      <Part text3={props.parts[2].name} count3={props.parts[2].exercises}></Part>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.text1} {props.count1}</p>
      <p>{props.text2} {props.count2}</p>
      <p>{props.text3} {props.count3}</p>
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))