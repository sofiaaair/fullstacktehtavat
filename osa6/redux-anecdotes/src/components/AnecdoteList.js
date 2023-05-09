import { useDispatch, useSelector } from "react-redux"
import { votingAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {

   
        const anecdotes = useSelector(state =>
        JSON.parse(JSON.stringify(state.anecdotes)).sort((a,b)=> b.votes-a.votes)
        .filter(anecdote =>
          anecdote.content.toLowerCase()
          .includes(state.filter.toLowerCase())))
        const dispatch = useDispatch()
      
        const vote = (anecdote) => {
          dispatch(votingAnecdote(anecdote))
        }
        const notificate = (content) => {
          dispatch(setNotification(`Anecdote: "${content}" voted`, 5))
        }
      

    return(
        <div>
        <h2>Anecdotes</h2>
        {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                vote(anecdote)
                notificate(anecdote.content)
                }}>vote</button>
            </div>
          </div>
        )}
        </div>

    )
    
}

export default AnecdoteList