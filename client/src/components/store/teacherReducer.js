import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   name: "",
   email: "",
   id: "",
   image_url: "",
   background: "",
   income: "",
   total_listens: "",
   total_favorites: "",
   meditations: [],
   follows: [],
   type: "teacher",
   opt_in: "",
   follow_message: "",
   chats: [],
   donations: [],
   total_donations: 0,
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
      addMessage: (state, action) => {
         state.chats.find(c => c.id === +action.payload.chat_id).messages.push(action.payload)
      },
      deleteChat: (state, action) => {
         return { ...state, chats: state.chats.filter(c => c.id !== action.payload.id) }
      },
      setChatsT: (state, action) => {
         return { ...state, chats: [action.payload] }
      },
   },
})

export const { loginT, setChatsT, updateMed, deleteChat, addMessage, addMed, deleteMed, logoutT } =
   teacherSlice.actions

export default teacherSlice.reducer
