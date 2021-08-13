import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ChatContainer from "./ChatContainer"

export default function InteractPage() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const chats = user.chats

   console.log(chats.find(c => c.id === 9))

   useEffect(() => {
      async function getData() {
         const res = await fetch(`/chats/${user.type}s/${user.id}`)
         const data = await res.json()
         console.log(data)
      }

      getData()
   }, [])

   const chatDisplayRedux = chats.map(c => (
      <ChatContainer userType={user.type} userName={user.name} key={c.id} c={c} />
   ))

   return (
      <>
         <div>Interacting now!</div>
         {chatDisplayRedux}
      </>
   )
}
