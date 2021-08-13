import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setChatsS } from "./store/studentReducer"
import { setChatsT } from "./store/teacherReducer"
import ChatContainer from "./ChatContainer"

export default function InteractPage() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const chats = user.chats
   const dispatch = useDispatch()
   const [fetchChats, setFetchChats] = useState([])
   const [addMessage, setAddMessage] = useState(false)
   const [deleteMessage, setDeleteMessage] = useState(false)

   const handleAdd = () => setAddMessage(!addMessage)
   const handleDelete = () => setDeleteMessage(!deleteMessage)

   useEffect(() => {
      async function getData() {
         const res = await fetch(`/chats/${user.type}s/${user.id}`)
         const data = await res.json()
         user.type === "teacher" ? dispatch(setChatsT(data)) : dispatch(setChatsS(data))
         setFetchChats(data)
      }

      getData()
   }, [addMessage, deleteMessage])

   const chatDisplayRedux = fetchChats.map(c => (
      <ChatContainer
         handleAdd={handleAdd}
         handleDelete={handleDelete}
         userType={user.type}
         userName={user.name}
         key={c.id}
         c={c}
      />
   ))

   return (
      <>
         <div>Interacting now!</div>
         {chatDisplayRedux}
      </>
   )
}
