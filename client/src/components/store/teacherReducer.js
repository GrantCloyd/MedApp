import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   name: "",
   email: "",
   id: "",
   image_url: "",
   background: "",
   income: "",
   total_listens: "",
   meditations: [],
   type: "teacher",
}

export const teacherSlice = createSlice({
   name: "teacher",
   initialState: initialState,
   reducers: {
      loginT: (state, action) => (state = { ...action.payload, type: "teacher" }),
      updateMed: (state, action) => {
         return {
            ...state,
            meditations: state.meditations.map(m => {
               if (m.id === action.payload.id) {
                  return action.payload
               } else {
                  return m
               }
            }),
         }
      },
      deleteMed: (state, action) => {
         return {
            ...state,
            meditations: state.meditations.filter(m => m.id !== action.payload),
         }
      },
      logoutT: (state, action) => (state = initialState),
      addMed: (state, action) => {
         return {
            ...state,
            meditations: [...state.meditations, action.payload],
         }
      },
   },
})

export const { loginT, updateMed, addMed, deleteMed, logoutT } = teacherSlice.actions

export default teacherSlice.reducer
