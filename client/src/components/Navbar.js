import React from "react"
import { useHistory, NavLink } from "react-router-dom"

export default function Navbar({ loggedIn, setLogInType }) {
   const history = useHistory()
   const handleLogOut = () => {
      setLogInType(false)
      history.push("/")
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
