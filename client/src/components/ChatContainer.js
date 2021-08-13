import React, { useState } from "react"
import { handleChange, createConfig } from "../functions"
import { useDispatch } from "react-redux"
import { addMessageT, deleteChatT } from "./store/teacherReducer"
import { addMessageS, deleteChatS } from "./store/studentReducer"

export default function ChatContainer({ userType, userName, c }) {
   const initialMessage = {
      content: "",
      teacher_id: c.teacher_id,
      student_id: c.student_id,
      chat_id: c.id,
      username: userName,
   }
   const [message, setMessage] = useState(initialMessage)
   const [errors, setErrors] = useState(false)
   const dispatch = useDispatch()

   const handleContent = e => handleChange(e, setMessage, message)
   async function handleMessageSubmit(e) {
      e.preventDefault()
      console.log(message)
      const res = await fetch(`/messages`, createConfig("POST", message))
      const data = await res.json()
      if (data.id) {
         userType === "teacher" ? dispatch(addMessageT(data)) : dispatch(addMessageS(data))
         setMessage(initialMessage)
      } else {
         setErrors(`Something went wrong: ${data.error}`)
      }
   }

   async function handleCloseChat(id) {
      const res = await fetch(`/chats/${id}`, createConfig("DELETE"))
      const data = await res.json()
      if (data.id) {
         if (userType === "teacher") {
            dispatch(deleteChatT(data))
         } else {
            dispatch(deleteChatS(data))
         }
      } else {
         setErrors(`Something went wrong: ${data.error}`)
      }
   }

   return (
      <>
         {" "}
         <hr />
         <div key={c.id}> Question: {c.title}</div>
         <ul>
            {" "}
            {c.messages.map(m => (
               <>
                  <li key={m.id}>
                     {m.username === userName ? "You wrote:" : `From: ${m.username}`} <br />
                     {m.username === userName ? m.content : `Message: ${m.content}`}
                  </li>
                  <br />
               </>
            ))}{" "}
         </ul>
         {errors && <p>{errors}</p>}
         <form onSubmit={handleMessageSubmit}>
            <label htmlFor="content"> Reply:</label>
            <input
               onChange={handleContent}
               value={c.content}
               name="content"
               type="textarea"
               placeholder="Respond"
            />
            <button> Reply </button>
         </form>
         <br />
         <button onClick={() => handleCloseChat(c.id)}>Close Question</button>
         <hr />
      </>
   )
}
