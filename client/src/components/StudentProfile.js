import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import StudentMedButtons from "./StudentMedButtons"
import { useHistory } from "react-router"
import { removeFollow } from "./store/studentReducer"
import { createConfig } from "../functions"
import { FormControlLabel, Switch } from "@material-ui/core"

export default function StudentProfile() {
   const user = useSelector(state => state.student)
   const recentPlays = user.recent_plays.slice(0, user.recent_plays.length - 1)
   const history = useHistory()
   const dispatch = useDispatch()
   const favorites = user.favorites
   const follows = user.follows
   const followsTecherId = useSelector(state => state.student.follows).map(f => f.teacher_id)
   const followerStatus = id => followsTecherId.includes(id)

   async function handleUnfollow(id) {
      const res = await fetch(`/follows/${id}`, createConfig("DELETE"))
      const data = await res.json()
      if (data.id) {
         dispatch(removeFollow(data.id))
      } else {
         alert(data.error)
      }
   }

   //should refactor below to put into a new component and handle message
   //for leaving in a timeout fashion and give chance to cancel maybe

   const followsDisplay = follows.map(f => (
      <>
         <p> {f.teacher.name} </p>
         <img alt={f.teacher.name} src={f.teacher.image_url} />
         <p>
            {" "}
            <button>Donate</button>
            <button onClick={() => history.push(`/teachers/${f.teacher.id}`)}>View Teacher</button>
         </p>
         <label htmlFor="followSwitch">Follow Teacher: </label>
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
         <h3>Following:</h3>
         {followsDisplay}
         <h3>Favorites</h3>
         <ul>{favoriteDisplay}</ul>
         <p>Student stats</p>
         <p> Total Sessions: {user.total_listens}</p>
         <p>Total Time Meditated: {user.total_time} minutes </p>
         <ul>{recentMeds}</ul>
      </div>
   )
}
