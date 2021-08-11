import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   name: "",
   email: "",
   id: "",
   image_url: "",
   background: "",
   income: "",
   meditations: [],
   type: "teacher",
}

export const teacherSlice = createSlice({
   name: "teacher",
   initialState: initialState,
   reducers: {
      login: (state, action) => (state = action.payload),
   },
})

export const { login } = teacherSlice.actions

export default teacherSlice.reducer
