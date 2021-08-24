import React, { useState } from "react"
import TeacherProfile from "./TeacherProfile"
import StudentProfile from "./StudentProfile"
import { createConfig, handleChange, makeIconBtn } from "../functions"
import { loginT } from "./store/teacherReducer"
import { loginS } from "./store/studentReducer"
import { useSelector, useDispatch } from "react-redux"
import {
   Dialog,
   FormControlLabel,
   Paper,
   DialogTitle,
   CardHeader,
   CardContent,
   DialogActions,
} from "@material-ui/core"
import {
   TightButton,
   StyledCancel,
   StyledSave,
   TightCard,
   StyledSwitch,
   StyledTextField,
   PaddedDialogContent,
} from "./styles"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import PermIdentityIcon from "@material-ui/icons/PermIdentity"
import { styled } from "@material-ui/core/styles"

const ProfileImage = styled("img")({
   height: "30%",
   width: "30%",
   objectFit: "contain",
})

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

      dispatch(loginT(data))
   }

   return (
      <div>
         {user.type === "teacher" && (
            <>
               {" "}
               <ProfileImage alt={user.image_name} src={user.image_url} />{" "}
            </>
         )}
         <br />

         {toggleEdit ? (
            <Dialog open={toggleEdit}>
               <div align="center">
                  <DialogTitle>Edit Details</DialogTitle>
                  <PaddedDialogContent>
                     <form onSubmit={handleSubmit}>
                        {user.name !== "guest" ? (
                           <>
                              <StyledTextField
                                 fullWidth
                                 onChange={handleProfileChange}
                                 type="text"
                                 label="Name"
                                 value={profileEdit.name}
                                 name="name"
                              />{" "}
                              <br />
                              <StyledTextField
                                 fullWidth
                                 onChange={handleProfileChange}
                                 type="text"
                                 label="Email"
                                 value={profileEdit.email}
                                 name="email"
                              />
                           </>
                        ) : (
                           <p>*Name and email cannot be edited as a guest* </p>
                        )}
                        {user.type === "teacher" && (
                           <>
                              <StyledTextField
                                 fullWidth
                                 onChange={handleProfileChange}
                                 type="text"
                                 label="Image Url"
                                 value={profileEdit.image_url}
                                 name="image_url"
                              />
                              <br />
                              <StyledTextField
                                 fullWidth
                                 margin="normal"
                                 multiline
                                 label="Background"
                                 onChange={handleProfileChange}
                                 type="textarea"
                                 value={profileEdit.background}
                                 name="background"
                              />
                              <br />
                              <StyledTextField
                                 multiline
                                 fullWidth
                                 margin="normal"
                                 label="Follow Message"
                                 onChange={handleProfileChange}
                                 type="textarea"
                                 value={profileEdit.follow_message}
                                 name="follow_message"
                              />
                           </>
                        )}
                     </form>
                  </PaddedDialogContent>
                  <DialogActions>
                     {makeIconBtn(StyledSave, handleSubmit)}
                     {makeIconBtn(StyledCancel, () => setToggleEdit(!toggleEdit))}
                  </DialogActions>
               </div>
            </Dialog>
         ) : (
            <TightCard>
               <CardHeader title="Profile" />
               <CardContent>
                  {makeIconBtn(PermIdentityIcon, null)}
                  {user.name} {makeIconBtn(MailOutlineIcon, null)}
                  {user.email}
                  {user.type === "teacher" && (
                     <Paper>
                        <p>Public Bio: {user.background} </p>
                        <p>Follow Message: {user.follow_message}</p>
                        <label htmlFor="optStatus"> Question Status: </label>
                        <FormControlLabel
                           control={
                              <StyledSwitch
                                 color="primary"
                                 name="optStatus"
                                 checked={user.opt_in}
                                 onChange={handleOptStatus}
                              />
                           }
                           label={user.opt_in ? "Open" : "Closed"}
                        />
                        <br />
                     </Paper>
                  )}
               </CardContent>
               <TightButton onClick={() => setToggleEdit(!toggleEdit)}>Edit Info</TightButton>
            </TightCard>
         )}
         <br />
         {user.type === "teacher" ? <TeacherProfile /> : <StudentProfile />}
      </div>
   )
}
