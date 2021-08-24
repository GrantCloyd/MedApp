import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { handleChange, createConfig } from "../functions"
import { loginT } from "./store/teacherReducer"
import { loginS } from "./store/studentReducer"
import { Container, Card, RadioGroup, FormLabel, FormControlLabel } from "@material-ui/core"
import { useDispatch } from "react-redux"
import {
   StyledButton,
   StyledTextField,
   StyledRad,
   CenterCon,
   StyledOutlineBtn,
   StyledLogo,
} from "./styles"
import { teacherGuest, studentGuest } from "./store/guestUsers"

export default function LogInPage() {
   const initialState = {
      email: "",
      password: "",
      type: "student",
   }

   const dispatch = useDispatch()

   const [errors, setErrors] = useState(false)
   const [logIn, setLogIn] = useState(initialState)
   const handleLogInChange = e => handleChange(e, setLogIn, logIn)
   const history = useHistory()

   async function handleLogIn(e, guest = null) {
      e.preventDefault()
      setErrors(false)

      const configObj = createConfig("POST", logIn)

      const res = await fetch("/log_in", configObj)
      const data = await res.json()
      if (data.id) {
         logIn.type === "teacher" ? dispatch(loginT(data)) : dispatch(loginS(data))
         history.push("/landing")
      } else {
         setErrors("Password and/or email do not match")
      }
   }

   async function handleGuest(guest) {
      setErrors(false)
      const configObj = createConfig("POST", guest === "teacher" ? teacherGuest : studentGuest)
      const res = await fetch("/log_in", configObj)
      const data = await res.json()
      if (data.id) {
         guest === "teacher" ? dispatch(loginT(data)) : dispatch(loginS(data))
         history.push("/landing")
      } else {
         setErrors("Something went wrong")
      }
   }

   return (
      <Card>
         <CenterCon>
            <p>
               {" "}
               <StyledLogo src="https://i.imgur.com/OS0kSRb.png?1" />
            </p>

            <h2>Log-In </h2>
            {errors && <p>{errors}</p>}

            <form onSubmit={handleLogIn}>
               <StyledTextField
                  onChange={handleLogInChange}
                  value={logIn.email}
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
               />
               <br />

               <StyledTextField
                  onChange={handleLogInChange}
                  value={logIn.password}
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  placeholder="Enter your password"
               />
               <br />
               <br />
               <Container size="med">
                  <FormLabel component="legend">User Type</FormLabel>

                  <RadioGroup name="type" value={logIn.type}>
                     <FormControlLabel
                        onChange={handleLogInChange}
                        control={<StyledRad color="default" />}
                        value="teacher"
                        label="Teacher"
                     />
                     <FormControlLabel
                        onChange={handleLogInChange}
                        control={<StyledRad color="default" />}
                        label="Student"
                        value="student"
                     />
                  </RadioGroup>
               </Container>
               <StyledButton type="submit">Submit</StyledButton>
            </form>
            <p>
               {" "}
               Don't have a login? <Link to="/signup">Sign up here! </Link>{" "}
            </p>
            <StyledOutlineBtn
               onClick={() => {
                  handleGuest("teacher")
               }}>
               Continue as Guest Teacher
            </StyledOutlineBtn>
            <br />
            <StyledOutlineBtn onClick={() => handleGuest("student")}>
               Continue as Guest Student
            </StyledOutlineBtn>
         </CenterCon>
      </Card>
   )
}
