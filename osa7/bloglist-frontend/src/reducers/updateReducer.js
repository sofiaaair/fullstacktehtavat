import { createSlice } from '@reduxjs/toolkit'

const updateSlice = createSlice({
  name:'update',
  initialState:[''],
  reducers:{
    setUpdate(state, action){

      return action.payload
    }
  }

})

export const { setUpdate } = updateSlice.actions
export default updateSlice.reducer