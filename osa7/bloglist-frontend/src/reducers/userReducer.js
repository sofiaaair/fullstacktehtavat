import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice( {
  name: 'user',
  initialState: {
    user:null,
    username:'',
    password:'',
    logininfo:''
  },
  reducers: {
    setUser(state, action){

      const updateUser = {
        ...state,
        user: action.payload
      }
      return updateUser
    },
    setUsername(state, action){

      const updateUser = {
        ...state,
        username: action.payload
      }
      return updateUser
    },
    setPassword(state, action){

      const updateUser = {
        ...state,
        password: action.payload
      }
      return updateUser
    },
    setLoginInfo(state,action){

      const updateUser= {
        ...state,
        logininfo: action.payload
      }
      return updateUser
    },

    nullUser(){

      return {
        user: null,
        username: '',
        password: '',
        logininfo: ''
      }
    }
  }
})

export const { setUser, setPassword, setUsername, nullUser, setLoginInfo } = userSlice.actions
export default userSlice.reducer