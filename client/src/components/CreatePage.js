import React, { useState } from "react"
import { medTypes } from "../constants"
import { handleChange, createConfig } from "../functions"

export default function CreatePage({ userData }) {
   const initialState = {
      title: "",
      description: "",
      med_type: "breath",
      est_length: "",
      audio_file: "",
      teacher_id: userData.id,
   }

   const [newMed, setNewMed] = useState(initialState)
   const [success, setSuccess] = useState(false)
   const [errors, setErrors] = useState(false)

   const handleNewMed = e => handleChange(e, setNewMed, newMed)
   const handleFile = e => setNewMed({ ...newMed, audio_file: e.target.files[0] })
   async function handleSubmit(e) {
      e.preventDefault()
      const res = await fetch("/meditations", createConfig("POST", newMed))
      const data = await res.json()
      if (data.ok) {
         console.log(data)
         setSuccess(true)
         setTimeout(() => setSuccess(false), 3000)
      } else {
         setErrors(data.error)
      }
   }

   return (
      <div>
         <h2>Hello!</h2>
         {success && <p>File Uploaded!</p>}
         {errors && <p>{errors}</p>}
         <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
               value={newMed.title}
               onChange={handleNewMed}
               type="text"
               name="title"
               placeholder="title"
            />
            <label htmlFor="description">Description</label>
            <input
               onChange={handleNewMed}
               value={newMed.description}
               type="text"
               name="description"
               placeholder="description"
            />
            <label htmlFor="med_type">Type</label>
            <select onChange={handleNewMed}>{medTypes}</select>
            <label htmlFor="est_length">Length in Minutes</label>
            <input
               value={newMed.est_length}
               onChange={handleNewMed}
               type="number"
               name="est_length"
               placeholder="length"
            />
            <label htmlFor="audio_file">Attach File</label>
            <input onChange={handleFile} type="file" name="audio_file" />
            <button>Submit</button>
         </form>
      </div>
   )
}
