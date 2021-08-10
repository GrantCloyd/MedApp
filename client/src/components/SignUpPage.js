import React, { useState } from "react"

import { createConfig } from "../functions"
import { handleChange } from "../functions"
import { useHistory } from "react-router-dom"

export default function SignUpPage() {
   const initialState = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "student",
   }
   const [signUp, setSignUp] = useState(initialState)
   const history = useHistory()
   const handleSignUpChange = e => handleChange(e, setSignUp, signUp)

   async function handleSignUp(e) {
      e.preventDefault()
      if (signUp.password === signUp.confirmPassword) {
         const configObj = createConfig("POST", signUp)

         const res = await fetch("/users", configObj)
         const data = await res.json()
         if (res.ok) {
            history.push("/")
         } else {
            alert(data.error)
         }
      } else {
         alert("make sure passwords match")
      }
   }

   return (
      <div>
         <h2>Sign Up Here!</h2>

         <form onSubmit={handleSignUp}>
            <label htmlFor="name">Name</label>
            <input
               onChange={handleSignUpChange}
               value={signUp.name}
               type="text"
               name="name"
               placeholder="Enter your name"
            />
            <label htmlFor="email">Email</label>

            <input
               onChange={handleSignUpChange}
               value={signUp.email}
               type="text"
               name="email"
               placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input
               onChange={handleSignUpChange}
               value={signUp.password}
               type="password"
               autoComplete="new-password"
               name="password"
               placeholder="Enter your password"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
               onChange={handleSignUpChange}
               value={signUp.confirmPassword}
               type="password"
               autoComplete="new-password"
               name="confirmPassword"
               placeholder="Confirm your password"
            />
            <label htmlFor="teacher">Teacher</label>
            <input
               onChange={handleSignUpChange}
               type="radio"
               id="teacher"
               value="teacher"
               name="type"></input>
            <label htmlFor="student">Student</label>
            <input onChange={handleSignUpChange} type="radio" value="student" name="type" />
            <button>Submit</button>
         </form>
      </div>
   )
}
