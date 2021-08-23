import React, { useState } from "react"
import { updateMed, deleteMed } from "./store/teacherReducer"
import { useDispatch } from "react-redux"
import MedLineItem from "./MedLineItem"
import { MenuItem, InputLabel, Select, ButtonGroup, Paper } from "@material-ui/core"
import {
   TightCard,
   TightButton,
   StyledSave,
   StyledPlayer,
   ReverseTightButton,
   StyledTextField,
} from "./styles"

import { handleChange, createConfig, makeLinkForBlob, makeIconBtn } from "../functions"

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

      dispatch(deleteMed(data))
   }

   return (
      <TightCard>
         {!toggleEdit && <MedLineItem m={m} />}
         {toggleEdit && (
            <Paper>
               <form onSubmit={handleSubmitPatch}>
                  <StyledTextField
                     onChange={handlePatchChange}
                     type="text"
                     value={patchObj.title}
                     name="title"
                     label="Title"
                  />

                  <br />
                  <StyledTextField
                     onChange={handlePatchChange}
                     type="text"
                     multiline
                     fullWidth
                     value={patchObj.description}
                     name="description"
                     label="Description"
                  />
                  <br />

                  <br />

                  <StyledTextField
                     value={patchObj.est_length}
                     onChange={handlePatchChange}
                     type="number"
                     name="est_length"
                     label="Length in Minutes"
                  />
                  <br />
                  <InputLabel id="type-label" htmlFor="med_type">
                     Type
                  </InputLabel>
                  <Select idLabel="type-label" name="med_type" onChange={handlePatchChange}>
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

                  <br />
                  <br />
                  {makeIconBtn(StyledSave, null, true)}
               </form>
               <br />
            </Paper>
         )}
         <>
            {togglePreview && (
               <StyledPlayer
                  controls={true}
                  width="100%"
                  height="50px"
                  url={makeLinkForBlob(m.audio_file)}
               />
            )}{" "}
            <ButtonGroup>
               <TightButton onClick={handlePreview}>
                  {!togglePreview ? "Preview" : "Close Preview"}
               </TightButton>{" "}
               <ReverseTightButton onClick={handleEdit}>
                  {!toggleEdit ? "Edit" : "Cancel Edit"}
               </ReverseTightButton>{" "}
               <TightButton onClick={handleDelete}>Delete</TightButton>{" "}
            </ButtonGroup>
         </>
      </TightCard>
   )
}
