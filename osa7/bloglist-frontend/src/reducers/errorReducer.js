import { createSlice } from '@reduxjs/toolkit'


const errorSlice = createSlice({
  name: 'error',
  initialState:null,
  reducers: {
    loginError() {
      return 'Wrong username or password'},
    addingError(){
      return 'Error while creating blog'},
    likeError(){
      return 'Error: like was not saved'},
    deletingError() {
      return 'Error: Deletion was not completed'},
    setError(state, action) {
      return `Error: ${action.payload}`
    },
    clearError() {
      return null}
  }
})

export const { loginError, addingError, likeError, deletingError, clearError, setError } = errorSlice.actions
export default errorSlice.reducer