import React from "react"
import { useHistory, NavLink } from "react-router-dom"
import { createConfig } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { logoutT } from "./store/teacherReducer"
import { logoutS } from "./store/studentReducer"
import { AppBar, Toolbar, Avatar } from "@material-ui/core"
import HomeIcon from "@material-ui/core/HomeIcon"

export default function Navbar() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const dispatch = useDispatch()
   const history = useHistory()
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

   return (
      <div>
         <AppBar position="static">
            <Toolbar>
               <NavLink to="/landing">Home</NavLink> <HomeIcon style={{ fontSize: 40 }} />
               ||
               <NavLink to="/profile">Profile</NavLink> ||
               {user.type === "teacher" ? (
                  <>
                     <NavLink to="/create">Create</NavLink> ||
                  </>
               ) : (
                  <>
                     <NavLink to="/search">Find Meditations</NavLink> ||
                  </>
               )}{" "}
               ||
               <NavLink to="/interact">Interact</NavLink>
               <NavLink to="/" onClick={handleLogOut}>
                  Logout
               </NavLink>
            </Toolbar>
         </AppBar>

         <hr />
      </div>
   )
}
