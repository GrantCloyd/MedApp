import React from "react"
import { useSelector } from "react-redux"

export default function StudentProfile() {
   const user = useSelector(state => state.student)
   const recentPlays = user.plays.map(p => p.meditation)
   const recentMeds = recentPlays.map(m => (
      <li key={m.created_at}>
         {" "}
         Title: {m.title} || Description: {m.description} || From: Pending Feat ||
         <button>Play Again</button>
      </li>
   ))

   console.log(recentPlays)
   console.log(recentMeds)

   return (
      <div>
         <h2>You're a student!</h2>
         <p>Student stats</p>
         <p> Sessions: {user.plays.length}</p>

         <ul>{recentMeds}</ul>
      </div>
   )
}
