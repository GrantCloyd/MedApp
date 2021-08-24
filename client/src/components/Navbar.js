import React, { useState } from "react"
import { useHistory, NavLink } from "react-router-dom"
import { createConfig } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { logoutT } from "./store/teacherReducer"
import { logoutS } from "./store/studentReducer"
import { Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import ContactMailIcon from "@material-ui/icons/ContactMail"
import { styled } from "@material-ui/core/styles"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MenuIcon from "@material-ui/icons/Menu"
import FindInPageIcon from "@material-ui/icons/FindInPage"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { StyledAppBar, SmallLogo } from "./styles"
import { makeIconBtn } from "../functions"

const StyledMenuBtn = styled(IconButton)({
   marginRight: "38%",
})

const StyledExit = styled(ExitToAppIcon)({
   color: "white",
})

const ExitLink = styled(NavLink)({
   marginLeft: "35%",
})

export default function Navbar() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const dispatch = useDispatch()
   const history = useHistory()
   const [anchorEl, setAnchorEl] = useState(null)

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
            <StyledMenuBtn edge="start" onClick={handleClick} color="inherit">
               <MenuIcon />
            </StyledMenuBtn>

            <SmallLogo src="https://i.imgur.com/OS0kSRb.png?1" />
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
               <NavLink to="/landing">
                  <MenuItem onClick={handleClose}> Home {makeIconBtn(HomeIcon, null)}</MenuItem>
               </NavLink>
               <NavLink to="/profile">
                  <MenuItem onClick={handleClose}>
                     {" "}
                     Profile {makeIconBtn(AccountCircle, null)}
                  </MenuItem>
               </NavLink>
               {user.type === "teacher" ? (
                  <NavLink to="/create">
                     <MenuItem onClick={handleClose}>
                        Create {makeIconBtn(AddCircleIcon, null)}
                     </MenuItem>
                  </NavLink>
               ) : (
                  <NavLink to="/search">
                     <MenuItem onClick={handleClose}>
                        Search {makeIconBtn(FindInPageIcon, null)}
                     </MenuItem>
                  </NavLink>
               )}
               <NavLink to="/interact">
                  <MenuItem onClick={handleClose}>
                     Interact
                     {makeIconBtn(ContactMailIcon, null)}
                  </MenuItem>
               </NavLink>
            </Menu>
            <ExitLink to="/"> {makeIconBtn(StyledExit, handleLogOut)}</ExitLink>
         </Toolbar>
      </StyledAppBar>
   )
}
