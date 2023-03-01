const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((totalExercises, part)=>
  totalExercises + part.exercises, 0)
  return(
      <b>Total of exercises {totalExercises}</b>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}


const Content = ({ course }) => course.map(item =>
  <Part key={item.id} name={item.name} exercises={item.exercises} />)


const Course = ({ courses }) => {

    return (
      courses.map(item =>
        <div key={item.id}>
          <Header course={item.name} />
          <Content key={item.parts.id} course={item.parts} />
          <Total parts={item.parts} />
        </div>
      )
    )
  
  
  }
  export default Course