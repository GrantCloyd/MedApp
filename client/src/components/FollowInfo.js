import React, { useState } from "react"
import { handleChange, createConfig } from "../functions"

export default function FollowInfo({ teacherName, teacherId, userId, userName }) {
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

   const handleQuestion = e => handleChange(e, setQuestion, question)
   const handleDonation = e => handleChange(e, setDonation, donation)

   async function handleSubmitQuestion(e) {
      e.preventDefault()
      console.log(question)
      const res = await fetch("/messages", createConfig("POST", question))
      const data = await res.json()
      console.log(data)

      if (data.message) {
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
         <p>Thanks for the follow!</p>
         <p>Here's a personalized message from me, this teacher</p>
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
            <button onClick={() => setToggleQuestion(!toggleQuestion)}> Ask a Question</button>{" "}
         </p>
         <hr />
      </div>
   )
}
