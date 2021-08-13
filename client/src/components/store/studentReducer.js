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
         state.plays = state.plays.push(action.payload)
         state.total_listens += 1
         state.total_time += action.payload.length
      },
      logoutS: state => (state = initialState),
      addFollow: (state, action) => {
         return {
            ...state,
            follows: [...state.follows, action.payload],
         }
      },
      removeFollow: (state, action) => {
         return {
            ...state,
            follows: state.follows.filter(f => f.id !== action.payload),
         }
      },
   },
})

export const { loginS, addPlay, addFollow, removeFollow, logoutS } = studentSlice.actions

export default studentSlice.reducer
