import { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0){
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {((props.good*1)+(props.bad*-1))/props.all}</p>
      <p>positive {props.good/props.all*100} %</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll]= useState(0)
  
const handleGoodClick = () =>{
  setGood(good+1)
  setAll(all+1)
}
const handleNeutralClick = () =>{
  setNeutral(neutral+1)
  setAll(all+1)
}
const handleBadClick = () =>{
  setBad(bad+1)
  setAll(all+1)
}

  return (
    <div>
      <div>
        <h1> Give feedback</h1>
        <button onClick={handleGoodClick}>
          good
        </button>
        <button onClick={handleNeutralClick}>
          neutral
        </button>
        <button onClick={handleBadClick}>
          bad
        </button>
      </div>
      <div>
        <Statistics good = {good} bad = {bad} neutral = {neutral} all = {all}/>
      </div>
    </div>
  )
}

export default App