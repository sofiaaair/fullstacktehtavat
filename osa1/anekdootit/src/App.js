import { useState } from 'react'

const MaxAnecdote = ({anecdotes, votes}) => {

  let max = Math.max(...votes)

  const isNumber = (number) => number ===max
  let index = votes.findIndex(isNumber)
  return(
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {max} votes</p>
    </div>
  )

}

const App = ()=> {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const selectRandomNumber = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  

  const voteAnecdote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    
  }

  
  const points = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(points)


  return (
    <div>
      <h1> Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={voteAnecdote}>
        vote
      </button>
      <button onClick={selectRandomNumber} >
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <MaxAnecdote anecdotes= {anecdotes} votes = {vote}/>
    </div>
  );
}

export default App;
