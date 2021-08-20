import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { handleChange, createConfig } from "../functions"
import { loginT } from "./store/teacherReducer"
import { loginS } from "./store/studentReducer"
import {
   TextField,
   Container,
   Card,
   RadioGroup,
   FormLabel,
   FormControlLabel,
} from "@material-ui/core"
import { useDispatch } from "react-redux"
import { StyledButton, StyledRad, StyledText, CenterCon } from "./styles"
import { styled } from "@material-ui/core/styles"

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

   async function handleLogIn(e) {
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

   return (
      <Card>
         <CenterCon>
            <h2>Log-In to Here|Now!</h2>
            {errors && <p>{errors}</p>}

            <form onSubmit={handleLogIn}>
               <StyledText
                  onChange={handleLogInChange}
                  value={logIn.email}
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
               />
               <br />

               <TextField
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

                  <RadioGroup name="userType">
                     <FormControlLabel
                        onChange={handleLogInChange}
                        control={<StyledRad color="default" />}
                        id="teacher"
                        value="teacher"
                        label="Teacher"
                        name="type"
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
         </CenterCon>
      </Card>
   )
}
