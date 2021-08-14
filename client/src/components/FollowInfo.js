import React, { useState } from "react"
import { handleChange, createConfig } from "../functions"
import { addChat } from "./store/studentReducer"
import { useDispatch } from "react-redux"

export default function FollowInfo({
   followMessage,
   optStatus,
   teacherName,
   teacherId,
   userId,
   userName,
}) {
   const initialDonation = { amount: 0, message: "", teacher_id: teacherId, student_id: userId }
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
      console.log(question)
      const res = await fetch("/messages", createConfig("POST", question))
      const data = await res.json()
      console.log(data)

      if (data.message) {
         dispatch(addChat({ ...data.chat, messages: [data.message] }))
         setResponse("Message sent!")
         setQuestion(initialQuestion)
         setTimeout(() => {
            setResponse(false)
            setToggleQuestion(false)
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
         {toggleDonate && <p>How much would you like to give?</p>}
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
            <button onClick={() => setToggleDonate(!toggleDonate)}>Donate</button>{" "}
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
