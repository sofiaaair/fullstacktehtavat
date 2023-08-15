import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState:null,
  reducers: {
    addingMessage(state, action){
      return `New blog ${action.payload} added`
    },
    removingMessage(state, action){
      return `Blog ${action.payload} removed`},
    clearNotification() {
      return null
    },
  }
})

export const { addingMessage, removingMessage, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer