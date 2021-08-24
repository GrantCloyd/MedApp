import React, { useState } from "react"
import { handleChange } from "../functions"
import { addMed } from "./store/teacherReducer"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {
   LinearProgress,
   DialogActions,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   MenuItem,
   IconButton,
   CardHeader,
   InputLabel,
} from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import { TightButton, StyledSelect, StyledTextField, TightCard, ReverseTightButton } from "./styles"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import PageviewIcon from "@material-ui/icons/Pageview"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import RecordingDialog from "./RecordingDialog"
import { makeIconBtn } from "../functions"

const StyledProg = styled(LinearProgress)({
   width: "50%",
   margin: "0 auto",
})

export default function CreatePage() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const initialState = {
      title: "",
      description: "",
      med_type: "Breath",
      est_length: "",
      audio_file: "",
      teacher_id: user.id,
   }
   const dispatch = useDispatch()
   const history = useHistory()
   const [prepRecord, setPrepRecord] = useState(false)
   const [newMed, setNewMed] = useState(initialState)
   const [success, setSuccess] = useState(false)
   const [errors, setErrors] = useState(false)
   const [loading, setLoading] = useState(false)
   const [attachedCustom, setAttachedCustom] = useState(false)

   const handleNewMed = e => handleChange(e, setNewMed, newMed)
   const handleFile = e => setNewMed({ ...newMed, audio_file: e.target.files[0] })

   async function handleSubmit(e) {
      e.preventDefault()
      setLoading(true)
      setErrors(false)

      const formData = new FormData()
      for (let key in newMed) {
         formData.append(key, newMed[key])
      }

      axios
         .post("http://localhost:3000/meditations", formData)
         .then(res => {
            if (res.data.id) {
               dispatch(addMed(res.data))
               setSuccess(true)
               setNewMed(initialState)
            }
            if (res.data.error) {
               setErrors(`Something went wrong, ${res.data.error}`)
            }
         })
         .then(() => {
            setLoading(false)
         })
   }

   const handleStayOnPage = () => {
      setSuccess(false)
      setPrepRecord(false)
   }

   return (
      <TightCard>
         <CardHeader title="Create and Upload" />
         {loading && (
            <p>
               <StyledProg />{" "}
            </p>
         )}
         {success && (
            <Dialog open={success}>
               {" "}
               <DialogTitle id="dialog-title">{"Sucess!"}</DialogTitle>
               <DialogContent>
                  <DialogContentText id="dialog-description">
                     Your file has been uploaded! Would you like to create more or view your new
                     content on your profile page?
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  {makeIconBtn(PageviewIcon, () => history.push("/profile"))}
                  {makeIconBtn(AddCircleIcon, handleStayOnPage)}
               </DialogActions>
            </Dialog>
         )}
         {errors && <p>{errors}</p>}
         <form onSubmit={handleSubmit}>
            <StyledTextField
               value={newMed.title}
               onChange={handleNewMed}
               label="Title"
               type="text"
               name="title"
            />

            <br />

            <StyledTextField
               onChange={handleNewMed}
               value={newMed.description}
               fullWidth
               multiline
               label="Description"
               type="text"
               name="description"
            />

            <StyledTextField
               margin="normal"
               label="Length in Minutes"
               value={newMed.est_length}
               onChange={handleNewMed}
               type="number"
               name="est_length"
            />
            <InputLabel id="type-label" htmlFor="med_type">
               Type
            </InputLabel>
            <StyledSelect
               idLabel="type-label"
               id="med_type"
               name="med_type"
               label="Type"
               onChange={handleNewMed}>
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
            </StyledSelect>
            <br />
            {!attachedCustom ? (
               <>
                  <input
                     accept="audio/*"
                     style={{ display: "none" }}
                     onChange={handleFile}
                     type="file"
                     name="audio_file"
                     id="audio_file"
                  />
                  <span>{newMed.audio_file.name}</span>
                  <label htmlFor="audio_file">
                     {" "}
                     <IconButton component="span">
                        {" "}
                        <CloudUploadIcon />
                     </IconButton>
                  </label>
               </>
            ) : (
               <p> Recorded File Attached </p>
            )}
            <br />
            <ReverseTightButton onClick={handleSubmit}>Submit</ReverseTightButton>
         </form>
         <br />
         <TightButton onClick={() => setPrepRecord(true)}>Record File</TightButton>
         <br />
         {prepRecord && (
            <RecordingDialog
               setErrors={setErrors}
               setPrepRecord={setPrepRecord}
               prepRecord={prepRecord}
               setNewMed={setNewMed}
               newMed={newMed}
               setAttachedCustom={setAttachedCustom}
            />
         )}
      </TightCard>
   )
}
