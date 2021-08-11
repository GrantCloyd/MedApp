import React from "react"
import TeacherProfile from "./TeacherProfile"
import StudentProfile from "./StudentProfile"
import { useSelector } from "react-redux"

export default function ProfilePage({ loggedIn, userData }) {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))

   return (
      <div>
         {user.type === "teacher" && <img src={userData.image_url} />}
         <h2>Profile</h2>
         <h3>Hello redux {user.name}</h3>
         <h3>Hello redux {user.email}</h3>
         <h3>redux email: {user.email}</h3>
         {user.type === "teacher" && <p>user.background </p>}
         {user.type === "teacher" ? <TeacherProfile {...user} /> : <StudentProfile {...user} />}
      </div>
   )
}
