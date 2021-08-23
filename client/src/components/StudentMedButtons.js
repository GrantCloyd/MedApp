import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { createConfig } from "../functions"
import { addFavorite, removeFav } from "./store/studentReducer"
import { useHistory } from "react-router"
import { CardActions, IconButton, Avatar } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import { StyledArrow } from "./styles"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import { makeIconBtn } from "../functions"

const StyledFavIcon = styled(FavoriteIcon)({
   color: `#BA1B1D`,
})

const StyledNotFavIcon = styled(FavoriteBorderIcon)({
   color: `#BA1B1D`,
})

export default function StudentMedButtons({ medId, teaId, teaImg }) {
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

   const findFavId = () => user.favorites.find(f => f.meditation_id === medId).id

   return (
      <CardActions>
         {" "}
         {makeIconBtn(StyledArrow, () => history.push(`/playingnow/${medId}`))}
         <IconButton onClick={() => history.push(`/teachers/${teaId}`)}>
            {" "}
            <Avatar alt="teacher-prof" src={teaImg} />{" "}
         </IconButton>
         {favMedsIds.includes(medId)
            ? makeIconBtn(StyledFavIcon, () => handleDeleteFav(findFavId()))
            : makeIconBtn(StyledNotFavIcon, () => handleFavorite(medId))}
      </CardActions>
   )
}
