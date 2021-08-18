import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { createConfig } from "../functions"
import { removeFollow } from "./store/studentReducer"
import { useHistory } from "react-router-dom"
import { FormControlLabel, Switch } from "@material-ui/core"
import StudentMedButtons from "./StudentMedButtons"

export default function LandingS({ favorites, follows, most_pop_med }) {
   const followsTecherId = useSelector(state => state.student.follows).map(f => f.teacher_id)
   const followerStatus = id => followsTecherId.includes(id)
   const dispatch = useDispatch()
   const history = useHistory()

   async function handleUnfollow(id) {
      const res = await fetch(`/follows/${id}`, createConfig("DELETE"))
      const data = await res.json()
      if (data.id) {
         dispatch(removeFollow(data.id))
      } else {
         alert(data.error)
      }
   }

   const followsDisplay = follows.map(f => (
      <>
         <p> {f.teacher.name} </p>
         <img alt={f.teacher.name} src={f.teacher.image_url} />
         <p>
            {" "}
            <button onClick={() => history.push(`/teachers/${f.teacher.id}`)}>View Teacher</button>
         </p>

         <FormControlLabel
            control={
               <Switch
                  color="primary"
                  name="followSwitch"
                  checked={id => followerStatus(id)}
                  onChange={() => handleUnfollow(f.id)}
               />
            }
            label={followerStatus ? "Following" : "Not Following"}
         />
      </>
   ))

   const favoriteDisplay = favorites.map(m => (
      <li key={m.id}>
         {" "}
         Title: {m.meditation.title} || From: {m.teacher_name} || Length: {m.meditation.est_length}{" "}
         ||
         <StudentMedButtons medId={m.meditation.id} teaId={m.meditation.teacher_id} />
      </li>
   ))

   const popularDisplay = [most_pop_med].map(m => (
      <p>
         {" "}
         Title: {m.title} || From: {m.teacher_name} || Length: {m.est_length} ||{" "}
         <StudentMedButtons medId={m.id} teaId={m.teacher_id} />{" "}
      </p>
   ))

   return (
      <div>
         {favoriteDisplay.length === 0 && followsDisplay.length === 0 && (
            <h4>Set up the teachers you'd like to follow and favorite meditations! </h4>
         )}
         <h3>Favorites:</h3>
         {favoriteDisplay.length === 0 ? <p>No Favorites Yet </p> : <ul>{favoriteDisplay}</ul>}
         <h3>Following:</h3>
         {followsDisplay.length === 0 ? <p>No follows yet</p> : followsDisplay}
         <h3>Most Popular:</h3>
         {popularDisplay}
      </div>
   )
}
