import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { createConfig } from "../functions"
import { useHistory } from "react-router-dom"
import { addFavorite, removeFav } from "./store/studentReducer"

export default function StudentProfile() {
   const user = useSelector(state => state.student)
   const history = useHistory()
   const recentPlays = user.recent_plays.slice(
      user.recent_plays.length - 5,
      user.recent_plays.length
   )
   const dispatch = useDispatch()
   const favMedsIds = user.favorites.map(f => f.meditation_id)

   async function handleFavorite(id) {
      const res = await fetch(
         "/favorites",
         createConfig("POST", { student_id: user.id, meditation_id: id })
      )
      const data = await res.json()
      dispatch(addFavorite(data))
   }

   async function handleDeleteFav(id) {
      const res = await fetch(`/favorites/${id}`, createConfig("DELETE"))
      const data = await res.json()

      dispatch(removeFav(data))
   }

   const recentMeds = recentPlays.map(m => (
      <li key={m.id}>
         {" "}
         Listened on: {new Date(m.created_at).toLocaleString()} || Title: {m.meditation.title} ||
         From: {m.teacher_name} ||
         <button onClick={() => history.push(`/playingnow/${m.meditation.id}`)}>Play Again</button>
         <button onClick={() => history.push(`/teachers/${m.meditation.teacher_id}`)}>
            View Teacher
         </button>
         {favMedsIds.includes(m.meditation.id) ? (
            <button
               onClick={() =>
                  handleDeleteFav(user.favorites.find(f => f.meditation_id === m.meditation.id).id)
               }>
               Unfavorite
            </button>
         ) : (
            <button onClick={() => handleFavorite(m.meditation.id)}>Favorite</button>
         )}
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
