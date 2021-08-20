import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { createConfig } from "../functions"
import { addFavorite, removeFav } from "./store/studentReducer"
import { useHistory } from "react-router"
import { CardActions, IconButton, Avatar } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import { primaryColor, secondaryColor, StyledFaceIcon, StyledArrow } from "./styles"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"

const StyledFavIcon = styled(FavoriteIcon)({
   color: `#BA1B1D`,
})

const StyledNotFavIcon = styled(FavoriteBorderIcon)({
   color: `#BA1B1D`,
})

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
      <CardActions>
         {" "}
         <IconButton onClick={() => history.push(`/playingnow/${medId}`)}>
            <StyledArrow />
         </IconButton>
         <IconButton onClick={() => history.push(`/teachers/${teaId}`)}>
            {" "}
            <StyledFaceIcon />{" "}
         </IconButton>
         {favMedsIds.includes(medId) ? (
            <IconButton
               onClick={() =>
                  handleDeleteFav(user.favorites.find(f => f.meditation_id === medId).id)
               }>
               <StyledFavIcon />
            </IconButton>
         ) : (
            <IconButton onClick={() => handleFavorite(medId)}>
               {" "}
               <StyledNotFavIcon />
            </IconButton>
         )}
      </CardActions>
   )
}
