import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   name: "",
   email: "",
   id: "",
   total_listens: 0,
   total_time: 0,
   plays: [],
   follows: [],
   type: "student",
}

export const studentSlice = createSlice({
   name: "student",
   initialState: initialState,
   reducers: {
      loginS: (state, action) => (state = { ...action.payload, type: "student" }),
      addPlay: (state, action) => {
         state.plays = [...state.plays, action.payload]
         state.total_listens += 1
         state.total_time += action.payload.length
      },
      logoutS: state => (state = initialState),
   },
})

export const { loginS, addPlay, logoutS } = studentSlice.actions

export default studentSlice.reducer
