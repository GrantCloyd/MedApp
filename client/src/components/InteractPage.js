import React, { useEffect } from "react"
import { useSelector } from "react-redux"

export default function InteractPage() {
   const chats = useSelector(state => state.teacher.chats)
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))

   useEffect(() => {
      async function getData() {
         const res = await fetch(`/chats/teachers/${user.id}`)
         const data = await res.json()
         console.log(data)
      }

      getData()
   }, [])

   console.log(chats)

   const chatDisplay = chats.map(c => (
      <>
         {" "}
         <div key={c.id}>{c.title}</div>
         <ul>
            {" "}
            {c.messages.map(m => (
               <li key={m.id}>
                  {m.username} : {m.content}{" "}
               </li>
            ))}{" "}
         </ul>
      </>
   ))

   console.log(chatDisplay)

   return (
      <>
         <div>Interacting now!</div>
         {chatDisplay}
      </>
   )
}
