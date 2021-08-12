import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

export default function StudentProfile() {
   const user = useSelector(state => state.student)
   const history = useHistory()
   const recentPlays = user.plays.slice(user.plays.length - 5, user.plays.length)
   console.log(recentPlays)

   const recentMeds = recentPlays.map(m => (
      <li key={m.id}>
         {" "}
         Listened on: {new Date(m.created_at).toLocaleString()} || Title: {m.meditation.title} ||
         From: {m.teacher_name} ||
         <button onClick={() => history.push(`/playingnow/${m.meditation.id}`)}>Play Again</button>
         <button onClick={() => history.push(`/teachers/${m.meditation.teacher_id}`)}>
            View Teacher
         </button>
         <button>Favorite</button>
      </li>
   ))

   return (
      <div>
         <h2>You're a student!</h2>
         <p>Student stats</p>
         <p> Total Sessions: {user.total_listens}</p>
         <p>Total Time Meditated: {user.total_time} minutes </p>
         <ul>{recentMeds}</ul>
      </div>
   )
}
