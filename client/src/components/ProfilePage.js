import React from "react"
import TeacherProfile from "./TeacherProfile"
import StudentProfile from "./StudentProfile"

export default function ProfilePage({ loggedIn, userData }) {
   console.log(userData)
   return (
      <div>
         {loggedIn === "teacher" && <img src={userData.image_url} />}
         <h2>Profile</h2>
         <h3>Hello {userData.name}</h3>
         <h3>email: {userData.email}</h3>
         {loggedIn === "teacher" ? (
            <TeacherProfile {...userData} />
         ) : (
            <StudentProfile {...userData} />
         )}
      </div>
   )
}
