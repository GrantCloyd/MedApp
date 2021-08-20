import React, { useState } from "react"
import TeacherProfile from "./TeacherProfile"
import StudentProfile from "./StudentProfile"
import { createConfig, handleChange } from "../functions"
import { loginT } from "./store/teacherReducer"
import { loginS } from "./store/studentReducer"
import { useSelector, useDispatch } from "react-redux"
import { Switch, FormControlLabel } from "@material-ui/core"
import { TightButton } from "./styles"

export default function ProfilePage() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const { name, email, image_url, background, id, follow_message } = user
   const [profileEdit, setProfileEdit] = useState({
      name,
      email,
      image_url,
      background,
      id,
      follow_message,
   })
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

   async function handleOptStatus(e) {
      const res = await fetch(
         `/teachers/${user.id}`,
         createConfig("PATCH", { opt_in: e.target.checked })
      )
      const data = await res.json()
      console.log(data)
      dispatch(loginT(data))
   }

   return (
      <div>
         {user.type === "teacher" && <img alt={user.image_name} src={user.image_url} />}
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
                        type="textarea"
                        value={profileEdit.background}
                        name="background"
                     />
                     <label htmlFor="follow_message"> Follow Message: </label>
                     <input
                        onChange={handleProfileChange}
                        type="textarea"
                        value={profileEdit.follow_message}
                        name="follow_message"
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
               <TightButton>Submit</TightButton>
            </form>
         ) : (
            <>
               <h2>Profile</h2>
               <h3>Hello: {user.name}</h3>
               <h3>Email: {user.email}</h3>
            </>
         )}
         {user.type === "teacher" && (
            <>
               <p>Public Bio: {user.background} </p>
               <p>Follow Message: {user.follow_message}</p>
               <label htmlFor="optStatus"> Question Status: </label>
               <FormControlLabel
                  control={
                     <Switch
                        color="primary"
                        name="optStatus"
                        checked={user.opt_in}
                        onChange={handleOptStatus}
                     />
                  }
                  label={user.opt_in ? "Open" : "Closed"}
               />
               <br />
            </>
         )}
         <TightButton onClick={() => setToggleEdit(!toggleEdit)}>Edit Info</TightButton>
         {user.type === "teacher" ? <TeacherProfile /> : <StudentProfile />}
      </div>
   )
}
