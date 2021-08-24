import React, { useState } from "react"
import { createConfig } from "../functions"
import { handleChange } from "../functions"
import { useHistory } from "react-router-dom"
import { Container, Card, RadioGroup, FormLabel, FormControlLabel } from "@material-ui/core"
import {
   StyledButton,
   StyledTextField,
   StyledRad,
   StyledLogo,
   CenterLogo,
   CenterCon,
} from "./styles"

export default function SignUpPage() {
   const initialState = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "student",
   }
   const [errors, setErrors] = useState(false)
   const [signUp, setSignUp] = useState(initialState)
   const history = useHistory()
   const handleSignUpChange = e => handleChange(e, setSignUp, signUp)

   async function handleSignUp(e) {
      e.preventDefault()
      if (signUp.password === signUp.confirmPassword) {
         setErrors(false)
         const configObj = createConfig("POST", signUp)

         const res = await fetch("/users", configObj)
         const data = await res.json()
         if (res.ok) {
            history.push("/")
         } else {
            setErrors(data.error)
         }
      } else {
         setErrors("make sure passwords match")
      }
   }

   return (
      <Card>
         <CenterCon>
            <p>
               <CenterLogo>
                  {" "}
                  <StyledLogo src="https://i.imgur.com/OS0kSRb.png?1" />
               </CenterLogo>
            </p>
            <h2>Sign Up Here!</h2>
            {errors && <p>{errors}</p>}
            <form onSubmit={handleSignUp}>
               <StyledTextField
                  onChange={handleSignUpChange}
                  value={signUp.name}
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
               />
               <br />
               <StyledTextField
                  onChange={handleSignUpChange}
                  value={signUp.email}
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
               />
               <br />

               <StyledTextField
                  onChange={handleSignUpChange}
                  value={signUp.password}
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  placeholder="Enter your password"
               />
               <br />
               <StyledTextField
                  onChange={handleSignUpChange}
                  value={signUp.confirmPassword}
                  type="password"
                  label="Confirm Password"
                  autoComplete="new-password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
               />
               <br />
               <br></br>
               <Container size="med">
                  <FormLabel component="legend">User Type</FormLabel>
                  <RadioGroup>
                     <FormControlLabel
                        onChange={handleSignUpChange}
                        control={<StyledRad color="default" />}
                        label="Teacher"
                        id="teacher"
                        value="teacher"
                        name="type"
                     />

                     <FormControlLabel
                        onChange={handleSignUpChange}
                        control={<StyledRad color="default" />}
                        label="Student"
                        value="student"
                        name="type"
                     />
                  </RadioGroup>
               </Container>
               <StyledButton type="submit">Submit</StyledButton>
            </form>
         </CenterCon>
      </Card>
   )
}
