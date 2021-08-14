import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { createConfig } from "../functions"
import { addFavorite, removeFav } from "./store/studentReducer"
import { useHistory } from "react-router"

export default function StudentMedButtons({ medId, teaId }) {
   const user = useSelector(state => state.student)
   const favMedsIds = user.favorites.map(f => f.meditation_id)
   const dispatch = useDispatch()
   const history = useHistory()

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

   return (
      <>
         {" "}
         <button onClick={() => history.push(`/playingnow/${medId}`)}>Play Again</button>
         <button onClick={() => history.push(`/teachers/${teaId}`)}>View Teacher</button>
         {favMedsIds.includes(medId) ? (
            <button
               onClick={() =>
                  handleDeleteFav(user.favorites.find(f => f.meditation_id === medId).id)
               }>
               Unfavorite
            </button>
         ) : (
            <button onClick={() => handleFavorite(medId)}>Favorite</button>
         )}
      </>
   )
}
