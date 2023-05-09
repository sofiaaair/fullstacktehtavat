import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({

    name: 'notification',
    initialState,
    reducers: {
        createNotification(state="", action){
            return action.payload
        }
    }

})

export const setNotification = (notification, time) => {
    return async dispatch => {
        
        dispatch(createNotification(notification))
    setTimeout(() => {
        dispatch(createNotification(""))
    }, time*1000)}


}
export const {createNotification} = notificationSlice.actions
export default notificationSlice.reducer