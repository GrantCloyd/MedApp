import React, { useState } from "react"
import { handleChange, createConfig } from "../functions"
import { addChat, addDonation } from "./store/studentReducer"
import { useDispatch } from "react-redux"
import {
   TightButton,
   StyledCancel,
   StyledTextField,
   StyledSend,
   ReverseTightButton,
} from "./styles"
import {
   ButtonGroup,
   Dialog,
   DialogActions,
   DialogTitle,
   DialogContent,
   Snackbar,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { makeIconBtn } from "../functions"

export default function FollowInfo({
   followMessage,
   optStatus,
   teacherName,
   teacherId,
   userId,
   userName,
}) {
   const initialDonation = {
      amount: 0,
      message: "",
      teacher_id: teacherId,
      student_id: userId,
      username: userName,
   }
   const initialQuestion = {
      teacher_id: teacherId,
      student_id: userId,
      content: "",
      title: "",
      username: userName,
   }

   const [toggleDonate, setToggleDonate] = useState(false)
   const [toggleQuestion, setToggleQuestion] = useState(false)
   const [donation, setDonation] = useState(initialDonation)
   const [question, setQuestion] = useState(initialQuestion)
   const [response, setResponse] = useState(false)
   const dispatch = useDispatch()

   const handleQuestion = e => handleChange(e, setQuestion, question)
   const handleDonation = e => handleChange(e, setDonation, donation)

   async function handleSubmitQuestion(e) {
      e.preventDefault()
      const res = await fetch("/messages", createConfig("POST", question))
      const data = await res.json()

      if (data.message) {
         dispatch(addChat({ ...data.chat, messages: [data.message] }))
         setResponse("Question sent!")
         setQuestion(initialQuestion)
         setTimeout(() => {
            setResponse(false)
            setToggleQuestion(false)
         }, 2000)
      } else {
         setResponse(`Something went wrong, ${data.error}`)
      }
   }

   async function createDonation(e) {
      e.preventDefault()

      const res = await fetch(`/donations`, createConfig("POST", donation))
      const data = await res.json()
      if (data.id) {
         dispatch(addDonation(data))
         setResponse("Donation sent! Thank You! ")
         setDonation(initialDonation)
         setTimeout(() => {
            setResponse(false)
            setToggleDonate(false)
         }, 2000)
      } else {
         setResponse(`Something went wrong, ${data.error}`)
      }
   }

   return (
      <div>
         <hr />
         {followMessage ? (
            <p>
               From {teacherName} : {followMessage}
            </p>
         ) : (
            <p>Thanks for the follow! This teacher has not set up a personalized message yet.</p>
         )}
         {!optStatus && <p>This teacher is not taking questions at this time.</p>}
         {response && (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={response}>
               <Alert variant="filled" severity="success">
                  {response}
               </Alert>
            </Snackbar>
         )}
         {toggleDonate && (
            <Dialog open={toggleDonate}>
               <DialogTitle id="dialog-donate">Donation Form</DialogTitle>
               <DialogContent>
                  <p> One dollar minimum required per donation</p>
                  <form onSubmit={createDonation}>
                     <StyledTextField
                        value={donation.amount}
                        onChange={handleDonation}
                        label="Amount"
                        type="number"
                        min={1}
                        name="amount"
                     />
                     <br />
                     <StyledTextField
                        value={donation.message}
                        multiline
                        onChange={handleDonation}
                        fullWidth
                        label="Message"
                        type="textarea"
                        name="message"
                        placeholder="Send a message .."
                     />
                     <p>from: {userName}</p>
                  </form>
               </DialogContent>
               <DialogActions>
                  {makeIconBtn(StyledSend, createDonation)}
                  {makeIconBtn(StyledCancel, () => setToggleDonate(!toggleDonate))}
               </DialogActions>
            </Dialog>
         )}
         {toggleQuestion && (
            <Dialog open={toggleQuestion}>
               <DialogContent>
                  <p>To: {teacherName}</p>
                  <form onSubmit={handleSubmitQuestion}>
                     <StyledTextField
                        value={question.title}
                        onChange={handleQuestion}
                        multiline
                        type="textarea"
                        name="title"
                        label="Title"
                        placeholder="Title .."
                     />

                     <StyledTextField
                        value={question.content}
                        label="Question"
                        fullWidth
                        multiline
                        onChange={handleQuestion}
                        type="textarea"
                        name="content"
                        placeholder="Ask a question .."
                     />
                  </form>
                  <p>from: {userName}</p>
               </DialogContent>
               <DialogActions>
                  {makeIconBtn(StyledSend, handleSubmitQuestion)}
                  {makeIconBtn(StyledCancel, () => setToggleQuestion(!toggleQuestion))}
               </DialogActions>
            </Dialog>
         )}
         <p>
            {" "}
            <>
               <ButtonGroup>
                  <TightButton onClick={() => setToggleDonate(!toggleDonate)}>
                     {toggleDonate ? "Close Donation" : "Donate"}
                  </TightButton>{" "}
                  {optStatus && (
                     <ReverseTightButton onClick={() => setToggleQuestion(!toggleQuestion)}>
                        {" "}
                        {toggleQuestion ? "Cancel Question" : "Ask a Question"}
                     </ReverseTightButton>
                  )}
               </ButtonGroup>
            </>
         </p>
         <hr />
      </div>
   )
}
