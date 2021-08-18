import React from "react"
import { useSelector } from "react-redux"
import LandingS from "./LandingS"

export default function Landing() {
   const user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))

   return (
      <div>
         <h2>Hello {user.name}!</h2>
         <h3>Welcome to Here|Now </h3>
         {user.type === "student" && <LandingS {...user} />}
      </div>
   )
}
