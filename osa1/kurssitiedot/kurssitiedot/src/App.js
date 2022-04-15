const Header = (props) => {
  return(
  <div>
    <h1>
      {props.course}
    </h1>
  </div>
)
}

const Content = (props) => {
  return (
  <div>
  <p>
    <Part part= {props.part1}/>
    <Part part={props.part2}/>
    <Part part={props.part3}/>
  </p>
  </div>
  )
}

const Total = (props) => {
  return (
  <div>
  <p>
    Number of total exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}
  </p>
  </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part.name} {props.part.exercises}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  } 
  
  const part3 = {
    name:'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  )
}

export default App
