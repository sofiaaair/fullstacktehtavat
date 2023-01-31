const Header = ({course}) => {
  return(
  <div>
    <h1>
      {course.name}
    </h1>
  </div>
)
}

const Content = ({parts}) => {
  return (
  <div>
  <p>
    <Part part= {parts[0]}/>
    <Part part={parts[1]}/>
    <Part part={parts[2]}/>
  </p>
  </div>
  )
}

const Total = ({parts}) => {
  return (
  <div>
  <p>
    Number of total exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
  </p>
  </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
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
    name:'State of a component',
    exercises: 14
    }
  ]
 }
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App
