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
            meditations: state.meditations.filter(m => m.id !== action.payload.id),
            last_med: [[...state.last_med.slice(1), action.payload.last_med][0]],
         }
      },
      logoutT: (state, action) => (state = initialState),
      addMed: (state, action) => {
         return {
            ...state,
            meditations: [action.payload, ...state.meditations],
            last_med: [...state.last_med.slice(1), action.payload],
         }
      },
      addMessage: (state, action) => {
         state.chats.find(c => c.id === +action.payload.chat_id).messages.push(action.payload)
      },
      deleteChat: (state, action) => {
         return { ...state, chats: state.chats.filter(c => c.id !== action.payload.id) }
      },
      setChatsT: (state, action) => {
         return { ...state, chats: action.payload }
      },
      updateIncome: (state, action) => {
         state.income = action.payload.income
      },
      hideDonation: (state, action) => {
         return { ...state, donations: state.donations.filter(d => d.id !== action.payload) }
      },
   },
})

export const {
   loginT,
   hideDonation,
   updateIncome,
   setChatsT,
   updateMed,
   deleteChat,
   addMessage,
   addMed,
   deleteMed,
   logoutT,
} = teacherSlice.actions

export default teacherSlice.reducer
