import React, { useState } from "react"
import { medTypes } from "../constants"
import { updateMed, deleteMed } from "./store/teacherReducer"
import { useDispatch } from "react-redux"
import MedLineItem from "./MedLineItem"
import { MenuItem, Select, ButtonGroup } from "@material-ui/core"
import { TightCard, TightButton, StyledPlayer, ReverseTightButton } from "./styles"

import { handleChange, createConfig, makeLinkForBlob } from "../functions"

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

      dispatch(deleteMed(data))
   }

   return (
      <TightCard square>
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
                  <Select name="med_type" onChange={handlePatchChange}>
                     <MenuItem value="--select-one--"> --select-one--</MenuItem>
                     <MenuItem value="Breath">Breath</MenuItem>
                     <MenuItem value="Awareness">Awareness</MenuItem>
                     <MenuItem value="Emotions">Emotions</MenuItem>
                     <MenuItem value="Metta">Metta</MenuItem>
                     <MenuItem value="Insight">Insight</MenuItem>
                     <MenuItem value="Bodyscan">Body Scan</MenuItem>
                     <MenuItem value="Listening">Listening</MenuItem>
                     <MenuItem value="Seeing">Seeing</MenuItem>
                     <MenuItem value="Walking">Walking</MenuItem>
                     <MenuItem value="Concentration">Concentration</MenuItem>
                     <MenuItem value="Nondual">Non-Dual</MenuItem>
                     <MenuItem value="Sleep">Sleep</MenuItem>
                  </Select>
                  <label htmlFor="est_length">Length in Minutes</label>
                  <input
                     value={patchObj.est_length}
                     onChange={handlePatchChange}
                     type="number"
                     name="est_length"
                  />
                  <TightButton type="submit">Confirm Change</TightButton>
               </form>
            </div>
         )}
         <>
            <MedLineItem m={m} />
            {togglePreview && (
               <StyledPlayer
                  controls={true}
                  width="100%"
                  height="50px"
                  url={makeLinkForBlob(m.audio_file)}
               />
            )}{" "}
            <ButtonGroup>
               <TightButton onClick={handlePreview}>Preview</TightButton>{" "}
               <ReverseTightButton onClick={handleEdit}>Edit</ReverseTightButton>{" "}
               <TightButton onClick={handleDelete}>Delete</TightButton>{" "}
            </ButtonGroup>
         </>
      </TightCard>
   )
}
