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
      loginT: (state, action) => (state = { ...action.payload, type: "teacher" }),
      updateT: (state, action) => (state = action.payload),
      logoutT: (state, action) => (state = initialState),
   },
})

export const { loginT, updateT, logoutT } = teacherSlice.actions

export default teacherSlice.reducer
