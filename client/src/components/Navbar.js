import React from "react"
import { useHistory, NavLink } from "react-router-dom"
import { createConfig } from "../functions"

export default function Navbar({ loggedIn, setLogInType }) {
   const history = useHistory()
   async function handleLogOut() {
      setLogInType(false)
      const res = await fetch("/log_in", createConfig("DELETE"))
      if (res.ok) {
         history.push("/")
      }
   }

   return (
      <div>
         <ul>
            <NavLink to="/landing">Home</NavLink>
            <li>Profile</li>
            {loggedIn === "teacher" ? (
               <>
                  <NavLink to="/create">Create</NavLink>
                  <li>Interact</li>
               </>
            ) : (
               <>
                  <li>Find Meditations</li>
               </>
            )}
            <li onClick={handleLogOut}>Logout</li>
         </ul>
         <hr />
      </div>
   )
}
