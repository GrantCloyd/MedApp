import React, { useState } from "react"
import { handleChange, createConfig } from "../functions"
import { addChat, addDonation } from "./store/studentReducer"
import { useDispatch } from "react-redux"

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
         }, 1500)
      } else {
         setResponse(`Something went wrong, ${data.error}`)
      }
   }

   async function createDonation(e) {
      e.preventDefault()

      console.log(donation)
      const res = await fetch(`/donations`, createConfig("POST", donation))
      const data = await res.json()
      if (data.id) {
         dispatch(addDonation(data))

         setResponse("Donation sent!")
         setDonation(initialDonation)
         setTimeout(() => {
            setResponse(false)
            setToggleDonate(false)
         }, 1500)
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
         {response && <p>{response}</p>}
         {toggleDonate && (
            <>
               <p>How much would you like to give?</p>
               <form onSubmit={createDonation}>
                  <label htmlFor="amount">Amount: $</label>
                  <input
                     value={donation.amount}
                     onChange={handleDonation}
                     type="number"
                     name="amount"
                  />
                  <label htmlFor="message">Message:</label>
                  <input
                     value={donation.message}
                     onChange={handleDonation}
                     type="textarea"
                     name="message"
                     placeholder="Send a message .."
                  />
                  <p>from: {userName}</p>
                  <button>Send</button>
               </form>
            </>
         )}
         {toggleQuestion && (
            <>
               <p>To: {teacherName}</p>
               <form onSubmit={handleSubmitQuestion}>
                  <label htmlFor="title">Question:</label>
                  <input
                     value={question.title}
                     onChange={handleQuestion}
                     type="textarea"
                     name="title"
                     placeholder="Title .."
                  />
                  <label htmlFor="content">Question:</label>
                  <input
                     value={question.content}
                     onChange={handleQuestion}
                     type="textarea"
                     name="content"
                     placeholder="Ask a question .."
                  />
                  <p>from: {userName}</p>
                  <button>Send</button>
               </form>
            </>
         )}
         <p>
            {" "}
            <button onClick={() => setToggleDonate(!toggleDonate)}>
               {toggleDonate ? "Close Donation" : "Donate"}
            </button>{" "}
            {optStatus && (
               <button onClick={() => setToggleQuestion(!toggleQuestion)}>
                  {" "}
                  {toggleQuestion ? "Cancel Question" : "Ask a Question"}
               </button>
            )}
         </p>
         <hr />
      </div>
   )
}
