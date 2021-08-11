import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { handleChange, createConfig } from "../functions"
import { loginT } from "./store/teacherReducer"
import { loginS } from "./store/studentReducer"

import { useDispatch } from "react-redux"

export default function LogInPage() {
   const initialState = {
      email: "",
      password: "",
      type: "student",
   }

   const dispatch = useDispatch()

   const [logIn, setLogIn] = useState(initialState)
   const handleLogInChange = e => handleChange(e, setLogIn, logIn)
   const history = useHistory()

   async function handleLogIn(e) {
      e.preventDefault()
      const configObj = createConfig("POST", logIn)

      const res = await fetch("/log_in", configObj)
      const data = await res.json()
      if (data.id) {
         logIn.type === "teacher" ? dispatch(loginT(data)) : dispatch(loginS(data))

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
               onChange={handleLogInChange}
               value={logIn.email}
               type="text"
               name="email"
               placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input
               onChange={handleLogInChange}
               value={logIn.password}
               type="password"
               autoComplete="new-password"
               name="password"
               placeholder="Enter your password"
            />
            <label htmlFor="teacher">Teacher</label>
            <input
               onChange={handleLogInChange}
               type="radio"
               id="teacher"
               value="teacher"
               name="type"></input>
            <label htmlFor="student">Student</label>
            <input onChange={handleLogInChange} type="radio" value="student" name="type" />
            <button>Submit</button>
         </form>
         <p>
            {" "}
            Don't have a login? <Link to="/signup">Sign up here! </Link>{" "}
         </p>
      </div>
   )
}
