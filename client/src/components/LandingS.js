import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { createConfig } from "../functions"
import { removeFollow } from "./store/studentReducer"
import { useHistory } from "react-router-dom"
import { FormControlLabel } from "@material-ui/core"
import StudentMedButtons from "./StudentMedButtons"
import { CardHeader, CardContent, Grid, CardActions, CardMedia } from "@material-ui/core"
import { TightCard, StyledSwitch } from "./styles"

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
      <TightCard>
         <div onClick={() => history.push(`/teachers/${f.teacher.id}`)}>
            <CardHeader title={f.teacher.name} />
            <CardMedia
               style={{ height: "300px" }}
               alt={f.teacher.name}
               image={f.teacher.image_url.toString()}
            />
         </div>
         <CardActions>
            {" "}
            <FormControlLabel
               control={
                  <StyledSwitch
                     color="primary"
                     name="followSwitch"
                     checked={followerStatus(f.teacher.id)}
                     onChange={() => handleUnfollow(f.id)}
                  />
               }
               label={followerStatus ? "Following" : "Not Following"}
            />
         </CardActions>
      </TightCard>
   ))

   const favoriteDisplay = favorites.map(m => (
      <TightCard key={m.id}>
         <CardContent>
            {" "}
            <CardHeader title={m.meditation.title} />
            {m.teacher_name} <br /> {m.meditation.est_length} minutes
         </CardContent>
         <StudentMedButtons
            medId={m.meditation.id}
            teaId={m.meditation.teacher_id}
            teaImg={m.teacher_image}
         />
      </TightCard>
   ))

   const popularDisplay = [most_pop_med].map(m => (
      <TightCard>
         <CardContent>
            {" "}
            <CardHeader title={m.title} />
            From: {m.teacher_name} <br /> {m.est_length} minutes
         </CardContent>
         <StudentMedButtons medId={m.id} teaId={m.teacher_id} teaImg={m.teacher_image} />{" "}
      </TightCard>
   ))

   return (
      <div>
         {favoriteDisplay.length === 0 && followsDisplay.length === 0 && (
            <h4>Set up the teachers you'd like to follow and favorite meditations! </h4>
         )}
         <h3>Favorites:</h3>
         {favoriteDisplay.length === 0 ? (
            <p>No Favorites Yet </p>
         ) : (
            <Grid container direction="row" justifyContent="center" alignItems="center">
               {favoriteDisplay}
            </Grid>
         )}
         <h3>Following:</h3>
         {followsDisplay.length === 0 ? (
            <p>No follows yet</p>
         ) : (
            <Grid container direction="row" justifyContent="center" alignItems="center">
               {followsDisplay}
            </Grid>
         )}

         <h3>Most Popular Meditation:</h3>
         {popularDisplay}
      </div>
   )
}
