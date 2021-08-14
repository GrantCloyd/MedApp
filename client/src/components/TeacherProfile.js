import React from "react"
import MeditationLi from "./MeditationLi"

export default function TeacherProfile({ total_listens, income, meditations, chats, follows }) {
   const medDisplay = meditations.map(m => <MeditationLi key={m.id} m={m} />)

   return (
      <div>
         <h2>Teacher Stats</h2>
         <p>Total Listens: {total_listens}</p>
         <p>Current Income: {income}</p>
         <p>Open Questions: {chats.length}</p>
         <p>Followers: {follows.length}</p>
         <p>Meditations</p>
         <ul>{medDisplay}</ul>
      </div>
   )
}
