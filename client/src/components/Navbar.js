import React from "react"
import { useHistory, NavLink } from "react-router-dom"
import { createConfig } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { logoutT } from "./store/teacherReducer"
import { logoutS } from "./store/studentReducer"

export default function Navbar() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const dispatch = useDispatch()
   const history = useHistory()
   let lastId = ""
   if (user.type !== "teacher") lastId = user.plays[user.plays.length - 1].id

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
         <ul>
            <NavLink to="/landing">Home</NavLink> ||
            <NavLink to="/profile">Profile</NavLink> ||
            {user.type === "teacher" ? (
               <>
                  <NavLink to="/create">Create</NavLink> ||
                  <NavLink to="/interact">Interact</NavLink>
               </>
            ) : (
               <>
                  <NavLink to="/search">Find Meditations</NavLink> ||
                  <NavLink to={`/playingnow/${lastId}`}>Play Last Meditation</NavLink>
               </>
            )}
            <li onClick={handleLogOut}>Logout</li>
         </ul>
         <hr />
      </div>
   )
}
