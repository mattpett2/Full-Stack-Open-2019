import React from 'react';

const Header = (props) => {
    return (
        <h2>{props.name}</h2>
    )
}

const Part = (props) => {
    return (
        <>
            {props.part} {props.exercise}
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
          {parts.map(part => <p key={part.id}><Part part={part.name} exercise={part.exercises}/></p>)}           
        </div>
    )
}

const Total = ({ parts }) => {
    const reducer = (accumulator, currentVal) => {
      return(
        accumulator + currentVal.exercises
      )
    }
    const total = parts.reduce(reducer,0)   

    return (
        <>
        <p className='thick'>
            toal of {total} exercises
        </p>
        </>
    )
}



const Course = ({ course }) => {
  
  return(
    <>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </>
  )
}

export default Course