import React, { useState } from "react"
import { useHistory, NavLink } from "react-router-dom"
import { createConfig } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { logoutT } from "./store/teacherReducer"
import { logoutS } from "./store/studentReducer"
import { AppBar, Toolbar, Avatar, Typography, IconButton, Menu, MenuItem } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import ContactMailIcon from "@material-ui/icons/ContactMail"
import { styled } from "@material-ui/core/styles"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MenuIcon from "@material-ui/icons/Menu"
import FindInPageIcon from "@material-ui/icons/FindInPage"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import AddCircleIcon from "@material-ui/icons/AddCircle"

const StyledAppBar = styled(AppBar)({
   backgroundColor: "#56A3A6",
})

export default function Navbar() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const dispatch = useDispatch()
   const history = useHistory()
   const [anchorEl, setAnchorEl] = useState(null)
   // let lastId = ""
   // if (user.type !== "teacher") lastId = user.plays[user.plays.length - 1].id

   async function handleLogOut() {
      const res = await fetch("/log_in", createConfig("DELETE"))
      if (res.ok) {
         dispatch(logoutT())
         dispatch(logoutS())
         history.push("/")
      }
   }

   const handleClick = event => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <StyledAppBar position="static">
         <Toolbar>
            <IconButton onClick={handleClick} color="inherit">
               <MenuIcon />
            </IconButton>
            <Typography variant="h4">Here|Now</Typography>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
               <MenuItem onClick={handleClose}>
                  <NavLink to="/landing">
                     {" "}
                     Home{" "}
                     <IconButton>
                        <HomeIcon />
                     </IconButton>
                  </NavLink>
               </MenuItem>
               <MenuItem onClick={handleClose}>
                  <NavLink to="/profile"> Profile</NavLink>
                  <IconButton>
                     {" "}
                     <AccountCircle />
                  </IconButton>
               </MenuItem>
               {user.type === "teacher" ? (
                  <>
                     <MenuItem onClick={handleClose}>
                        <NavLink to="/create"> Create</NavLink>
                        <IconButton>
                           {" "}
                           <AddCircleIcon />
                        </IconButton>
                     </MenuItem>
                     {/* <NavLink to="/create">Create</NavLink> || */}
                  </>
               ) : (
                  <>
                     <MenuItem onClick={handleClose}>
                        <NavLink to="/search"> Search </NavLink>
                        <IconButton>
                           {" "}
                           <FindInPageIcon />
                        </IconButton>
                     </MenuItem>
                  </>
               )}
               <MenuItem onClick={handleClose}>
                  <NavLink to="/interact"> Interact</NavLink>
                  <IconButton>
                     {" "}
                     <ContactMailIcon />
                  </IconButton>
               </MenuItem>
               <MenuItem onClick={handleClose}>
                  <NavLink to="/" onClick={handleLogOut}>
                     {" "}
                     Logout
                  </NavLink>
                  <IconButton>
                     {" "}
                     <ExitToAppIcon />
                  </IconButton>
               </MenuItem>
            </Menu>
         </Toolbar>
      </StyledAppBar>
   )
}
