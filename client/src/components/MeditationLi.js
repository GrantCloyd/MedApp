import React, { useState } from "react"
import { medTypes } from "../constants"
import { updateMed, deleteMed } from "./store/teacherReducer"
import { useDispatch } from "react-redux"
import MedLineItem from "./MedLineItem"

import { handleChange, createConfig, makeLinkForBlob } from "../functions"
import ReactPlayer from "react-player"

export default function MeditationLi({ m }) {
   let initialState = { ...m }
   const dispatch = useDispatch()

   const [togglePreview, setTogglePreview] = useState(false)
   const [toggleEdit, setToggleEdit] = useState(false)
   const [patchObj, setPatchObj] = useState(initialState)

   const handlePreview = () => setTogglePreview(!togglePreview)
   const handleEdit = () => setToggleEdit(!toggleEdit)
   const handlePatchChange = e => handleChange(e, setPatchObj, patchObj)

   async function handleSubmitPatch(e) {
      e.preventDefault()
      const res = await fetch(`/meditations/${m.id}`, createConfig("PATCH", patchObj))
      const data = await res.json()
      dispatch(updateMed(data))
      setToggleEdit(!toggleEdit)
   }

   async function handleDelete() {
      const res = await fetch(`meditations/${m.id}`, createConfig("DELETE"))
      const data = await res.json()
      console.log(data)
      debugger
      dispatch(deleteMed(data))
   }

   return (
      <>
         {toggleEdit && (
            <div>
               <form onSubmit={handleSubmitPatch}>
                  <label htmlFor="title">Title</label>
                  <input
                     onChange={handlePatchChange}
                     type="text"
                     value={patchObj.title}
                     name="title"
                  />
                  <label htmlFor="description">Description</label>
                  <input
                     onChange={handlePatchChange}
                     type="text"
                     value={patchObj.description}
                     name="description"
                  />
                  <label htmlFor="med_type">Type</label>
                  <select name="med_type" onChange={handlePatchChange}>
                     {medTypes}
                  </select>
                  <label htmlFor="est_length">Length in Minutes</label>
                  <input
                     value={patchObj.est_length}
                     onChange={handlePatchChange}
                     type="number"
                     name="est_length"
                  />
                  <button>Confirm Change</button>
               </form>
            </div>
         )}
         <>
            {togglePreview && (
               <ReactPlayer controls={true} height="50px" url={makeLinkForBlob(m.audio_file)} />
            )}{" "}
            <MedLineItem m={m} />
            <button onClick={handlePreview}>Preview</button>{" "}
            <button onClick={handleEdit}>Edit</button>{" "}
            <button onClick={handleDelete}>Delete</button>{" "}
         </>
      </>
   )
}
