import React from "react"
import { useSelector } from "react-redux"
import StudentMedButtons from "./StudentMedButtons"

export default function StudentProfile() {
   const user = useSelector(state => state.student)
   const recentPlays = user.recent_plays.slice(0, user.recent_plays.length - 1)
   const favorites = user.favorites

   const favoriteDisplay = favorites.map(m => (
      <li key={m.id}>
         {" "}
         Title: {m.meditation.title} || From: {m.teacher_name} || Length: {m.meditation.est_length}{" "}
         ||
         <StudentMedButtons medId={m.meditation.id} teaId={m.meditation.teacher_id} />
      </li>
   ))

   const recentMeds = recentPlays.map(m => (
      <li key={m.id}>
         {" "}
         Listened on: {new Date(m.created_at).toLocaleString()} || Title: {m.meditation.title} ||
         From: {m.teacher_name} ||
         <StudentMedButtons medId={m.meditation.id} teaId={m.meditation.teacher_id} />
      </li>
   ))

   return (
      <div>
         <h2>You're a student!</h2>
         <p>Favorites</p>
         <ul>{favoriteDisplay}</ul>
         <p>Student stats</p>
         <p> Total Sessions: {user.total_listens}</p>
         <p>Total Time Meditated: {user.total_time} minutes </p>
         <ul>{recentMeds}</ul>
      </div>
   )
}
