import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { BrowserRouter } from 'react-router-dom'
import updateReducer from './reducers/updateReducer'


const store = configureStore( {
  reducer: {
    notification: notificationReducer,
    error: errorReducer,
    blog: blogReducer,
    user: userReducer,
    update: updateReducer,
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'))


export const renderApp = () => {
  root.render(
    <BrowserRouter>
      <Provider store= {store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}

renderApp()


