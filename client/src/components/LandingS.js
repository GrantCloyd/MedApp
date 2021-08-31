import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { createConfig } from "../functions"
import { removeFollow } from "./store/studentReducer"
import { useHistory } from "react-router-dom"
import { FormControlLabel } from "@material-ui/core"
import FavoriteCard from "./FavoriteCard"
import { CardHeader, Grid, CardActions, CardMedia } from "@material-ui/core"
import { TightCard, StyledSwitch } from "./styles"
import { styled } from "@material-ui/core/styles"

const TeacherImage = styled(CardMedia)({
   height: "300px",
})

export default function LandingS({ favorites, follows, most_pop_med }) {
   const followsTeacherId = useSelector(state => state.student.follows).map(f => f.teacher_id)
   const followerStatus = id => followsTeacherId.includes(id)
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

   let followsDisplay = []

   if (follows.length > 0) {
      followsDisplay = follows.map(f => (
         <TightCard>
            <div onClick={() => history.push(`/teachers/${f.teacher.id}`)}>
               <CardHeader title={f.teacher.name} />
               <TeacherImage alt={f.teacher.name} image={f.teacher.image_url.toString()} />
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
   }

   let favoriteDisplay = []

   if (favorites.length > 0) {
      favoriteDisplay = favorites.map(m => <FavoriteCard {...m} key={m.id} />)
   }

   // const popularDisplay = [most_pop_med].map(m => <FavoriteCard {...m} key={m.id} />)

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

         {/* <h3>Most Popular Meditation:</h3>
         {popularDisplay} */}
      </div>
   )
}
