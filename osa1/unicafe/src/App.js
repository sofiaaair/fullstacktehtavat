import { useState } from 'react'



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
        <h1>Statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {(good*1)+(bad*-1)/all}</p>
        <p>positive {good/all} %</p>
      </div>
    </div>
  )
}

export default App