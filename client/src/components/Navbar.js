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
                  <NavLink to="/create">Create</NavLink>
                  <li>Interact</li>
               </>
            ) : (
               <>
                  <li>Find Meditations</li>
                  <NavLink to="/playingnow">Play Meditation</NavLink>
               </>
            )}
            <li onClick={handleLogOut}>Logout</li>
         </ul>
         <hr />
      </div>
   )
}
