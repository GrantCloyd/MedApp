import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { HEADERS } from "../constants"

export default function LogInPage({ setLogInType }) {
   const initialState = {
      email: "",
      password: "",
      type: "student",
   }
   const [logIn, setLogIn] = useState(initialState)
   const history = useHistory()

   const handleChange = e => setLogIn({ ...logIn, [e.target.name]: e.target.value })
   async function handleLogIn(e) {
      e.preventDefault()
      const configObj = {
         method: "POST",
         headers: HEADERS,
         body: JSON.stringify(logIn),
      }

      const res = await fetch("/log_in", configObj)

      if (res.status === 204) {
         setLogInType(logIn.type)
         history.push("/landing")
      } else {
         alert("Password and/or email do not match")
      }
   }

   return (
      <div>
         <h2>Log-In Here!</h2>
         <form onSubmit={handleLogIn}>
            <label htmlFor="email">Email</label>
            <input
               onChange={handleChange}
               value={logIn.email}
               type="text"
               name="email"
               placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input
               onChange={handleChange}
               value={logIn.password}
               type="password"
               autoComplete="new-password"
               name="password"
               placeholder="Enter your password"
            />
            <label htmlFor="teacher">Teacher</label>
            <input
               onChange={handleChange}
               type="radio"
               id="teacher"
               value="teacher"
               name="type"></input>
            <label htmlFor="student">Student</label>
            <input onChange={handleChange} type="radio" value="student" name="type" />
            <button>Submit</button>
         </form>
         <p>
            {" "}
            Don't have a login? <Link to="/signup">Sign up here! </Link>{" "}
         </p>
      </div>
   )
}
