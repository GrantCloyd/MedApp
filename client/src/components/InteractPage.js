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

   const donationsDisplay = user.donations.map(d => (
      <div key={d.id}>
         <hr />
         <p>
            Name: {d.username} || Amount: {d.amount}
         </p>
         <p>Message: {d.message}</p>
         <hr />
      </div>
   ))

   const chatDisplay = fetchChats.map(c => (
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
         <h2>Message{user.type === "teacher" && " & Donations"} Page</h2>
         {user.opt_in === false ? (
            <p>
               You are not signed up to receive messages. Please opt-in on your profile page to do
               so.
            </p>
         ) : (
            <h3>Messages</h3>
         )}
         {chatDisplay}
         {chatDisplay.length === 0 && <p>You have no messages!</p>}
         {user.type === "teacher" && <h3>Donations</h3>}
         {user.type !== "student" ? (
            user.donations.length > 0 ? (
               donationsDisplay
            ) : (
               <p>No donations yet</p>
            )
         ) : null}
      </>
   )
}
