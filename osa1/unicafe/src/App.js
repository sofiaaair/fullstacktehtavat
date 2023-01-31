import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  if (text === "positive"){
    return(
      <p>{text} {value} %</p>
    )
  }
  return(
    <p>{text} {value}</p>
  )
}

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
      <StatisticLine text = "good" value = {props.good}/>
      <StatisticLine text = "neutral" value = {props.neutral}/>
      <StatisticLine text = "bad" value = {props.bad}/>
      <StatisticLine text = "all" value = {props.all}/>
      <StatisticLine text = "average" value = {((props.good*1)+(props.bad*-1))/props.all}/>
      <StatisticLine text = "positive" value = {props.good/props.all*100}/>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick = {onClick}>{text}</button>
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
        <Button onClick = {handleGoodClick} text = "good"/>
        <Button onClick={handleNeutralClick} text = "neutral"/>
        <Button onClick={handleBadClick}text = "bad"/>
      </div>
      <div>
        <Statistics good = {good} bad = {bad} neutral = {neutral} all = {all}/>
      </div>
    </div>
  )
}

export default App