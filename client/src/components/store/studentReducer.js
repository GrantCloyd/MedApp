import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   name: "",
   email: "",
   id: "",
   plays: [],
   type: "student",
}

export const studentSlice = createSlice({
   name: "student",
   initialState: initialState,
   reducers: {
      loginS: (state, action) => (state = action.payload),
      updateS: (state, action) => (state = action.payload),
      logoutS: state => (state = initialState),
   },
})

export const { loginS, updateS, logoutS } = studentSlice.actions

export default studentSlice.reducer
