import React, { useState } from "react"
import { handleChange, createConfig, makeIconBtn } from "../functions"
import { Avatar } from "@material-ui/core"
import {
   StyledSend,
   StyledCancel,
   TightCard,
   TightPaper,
   StyledTextField,
   StyledHelp,
} from "./styles"

export default function ChatContainer({ handleDelete, handleAdd, userType, userName, c }) {
   const initialMessage = {
      content: "",
      teacher_id: c.teacher_id,
      student_id: c.student_id,
      chat_id: c.id,
      username: userName,
   }
   const [message, setMessage] = useState(initialMessage)
   const [errors, setErrors] = useState(false)

   const handleContent = e => handleChange(e, setMessage, message)
   async function handleMessageSubmit(e) {
      e.preventDefault()

      const res = await fetch(`/messages`, createConfig("POST", message))
      const data = await res.json()
      setMessage(initialMessage)
      if (data.id) {
         handleAdd()
      } else {
         setErrors(`Something went wrong: ${data.error}`)
      }
   }

   async function handleCloseChat(id) {
      const res = await fetch(`/chats/${id}`, createConfig("DELETE"))
      const data = await res.json()
      data.id ? handleDelete() : setErrors(`Something went wrong: ${data.error}`)
   }

   return (
      <>
         {" "}
         <TightPaper key={c.id}>
            {" "}
            {makeIconBtn(StyledHelp, null)}
            {c.messages[0].username} asked: " {c.title} "
         </TightPaper>
         <ul>
            {" "}
            {c.messages.map(m => (
               <>
                  <li key={m.id}>
                     <TightCard>
                        <Avatar variant="square">{m.username.slice(0, 1)}</Avatar>
                        {m.username === userName ? "You wrote:" : `From: ${m.username}`} <br />{" "}
                        <br />
                        {m.username === userName ? m.content : `Message: ${m.content}`}
                        <p />
                     </TightCard>
                  </li>
                  <br />
               </>
            ))}{" "}
         </ul>
         {errors && <p>{errors}</p>}
         <form onSubmit={handleMessageSubmit}>
            <StyledTextField
               onChange={handleContent}
               multiline
               margin="normal"
               label="Reply"
               value={c.content}
               name="content"
               type="textarea"
               placeholder="Respond"
            />
            {makeIconBtn(StyledSend, null, true)}
         </form>
         <br />
         {makeIconBtn(StyledCancel, () => handleCloseChat(c.id))}
      </>
   )
}
