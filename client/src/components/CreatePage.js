import React, { useState } from "react"
import { medTypes } from "../constants"
import { handleChange } from "../functions"
import { addMed } from "./store/teacherReducer"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

export default function CreatePage() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const dispatch = useDispatch()
   const history = useHistory()

   const initialState = {
      title: "",
      description: "",
      med_type: "Breath",
      est_length: "",
      audio_file: "",
      teacher_id: user.id,
   }

   const [newMed, setNewMed] = useState(initialState)
   const [success, setSuccess] = useState(false)
   const [errors, setErrors] = useState(false)

   const handleNewMed = e => handleChange(e, setNewMed, newMed)
   const handleFile = e => {
      setNewMed({ ...newMed, audio_file: e.target.files[0] })
   }
   async function handleSubmit(e) {
      e.preventDefault()

      const formData = new FormData()
      for (let key in newMed) {
         formData.append(key, newMed[key])
      }

      axios
         .post("http://localhost:3000/meditations", formData)
         .then(res => {
            const { id, title, med_type, audio_file, description, est_length } = res.data
            dispatch(addMed({ id, title, med_type, audio_file, description, est_length }))
         })
         .then(() => {
            setSuccess(true)
            setTimeout(() => history.push("/profile"), 2500)
         })
      //.then(data => console.log(data))
   }

   return (
      <div>
         <h2>Create and Upload </h2>
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
            <select name="med_type" onChange={handleNewMed}>
               {medTypes}
            </select>
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
