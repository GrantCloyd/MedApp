import React, { useState } from "react"
import TeacherProfile from "./TeacherProfile"
import StudentProfile from "./StudentProfile"
import { createConfig, handleChange } from "../functions"
import { loginT } from "./store/teacherReducer"
import { loginS } from "./store/studentReducer"
import { useSelector, useDispatch } from "react-redux"

export default function ProfilePage() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const { name, email, image_url, background, id } = user
   const [profileEdit, setProfileEdit] = useState({ name, email, image_url, background, id })
   const [toggleEdit, setToggleEdit] = useState(false)
   const dispatch = useDispatch()

   const handleProfileChange = e => handleChange(e, setProfileEdit, profileEdit)

   async function handleSubmit(e) {
      e.preventDefault()
      const res = await fetch(`/${user.type}s/${user.id}`, createConfig("PATCH", profileEdit))
      const data = await res.json()
      user.type === "teacher" ? dispatch(loginT(data)) : dispatch(loginS(data))
      setToggleEdit(false)
   }

   return (
      <div>
         {user.type === "teacher" && <img src={user.image_url} />}
         {toggleEdit ? (
            <form onSubmit={handleSubmit}>
               <label htmlFor="name">Name: </label>
               <input
                  onChange={handleProfileChange}
                  type="text"
                  value={profileEdit.name}
                  name="name"
               />
               <label htmlFor="email">Email: </label>
               <input
                  onChange={handleProfileChange}
                  type="text"
                  value={profileEdit.email}
                  name="email"
               />
               {user.type === "teacher" && (
                  <>
                     <label htmlFor="background"> Background: </label>
                     <input
                        onChange={handleProfileChange}
                        type="text"
                        value={profileEdit.background}
                        name="background"
                     />
                     <label htmlFor="image_url"> Profile Picture: </label>
                     <input
                        onChange={handleProfileChange}
                        type="text"
                        value={profileEdit.image_url}
                        name="image_url"
                     />
                  </>
               )}
               <button>Submit</button>
            </form>
         ) : (
            <>
               <h2>Profile</h2>
               <h3>Hello: {user.name}</h3>
               <h3>Email: {user.email}</h3>
            </>
         )}
         {user.type === "teacher" && <p>{user.background} </p>}
         <button onClick={() => setToggleEdit(!toggleEdit)}>Edit</button>
         {user.type === "teacher" ? <TeacherProfile {...user} /> : <StudentProfile {...user} />}
      </div>
   )
}
