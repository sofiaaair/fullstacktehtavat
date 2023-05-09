import React from 'react'
import ReactDOM from 'react-dom/client'
import anecdoteService from './services/anecdotes'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'



const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

//anecdoteService.getAll().then(anecdotes => store.dispatch(setAnecdotes(anecdotes)))


const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(  
  <Provider store={store}>
    <App />
  </Provider>)
}

renderApp()
store.subscribe(renderApp)