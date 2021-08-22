import React, { useState, useEffect } from "react"
import { medTypes } from "../constants"
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
   Select,
   MenuItem,
   IconButton,
   CardHeader,
   InputLabel,
} from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import {
   TightButton,
   StyledSelect,
   StyledTextField,
   TightCard,
   ReverseTightButton,
   StyledArrow,
   primaryColor,
} from "./styles"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import PauseIcon from "@material-ui/icons/Pause"
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import RedoIcon from "@material-ui/icons/Redo"
import CheckIcon from "@material-ui/icons/Check"
import PageviewIcon from "@material-ui/icons/Pageview"
import AddCircleIcon from "@material-ui/icons/AddCircle"

const StyledPause = styled(PauseIcon)({
   color: `${primaryColor}`,
})

const StyledRecordingIcon = styled(FiberManualRecordIcon)({
   color: `#BA1B1D`,
})

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
   const [recordingState, setRecordingState] = useState(false)
   const [mediaRecorder, setMediaRecorder] = useState(false)
   const [mediaChunks, setMediaChunks] = useState([])
   const [newMed, setNewMed] = useState(initialState)
   const [success, setSuccess] = useState(false)
   const [errors, setErrors] = useState(false)
   const [minutes, setMinutes] = useState(0)
   const [seconds, setSeconds] = useState(0)
   const [previewUrl, setPreviewUrl] = useState("")
   const [loading, setLoading] = useState(false)

   async function prepForRecording() {
      setPrepRecord(true)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMediaRecorder(new MediaRecorder(stream, { mimeType: "audio/webm" }))
      setRecordingState(true)
   }

   async function handleRecording() {
      switch (recordingState) {
         case true:
            mediaRecorder.start()
            setRecordingState("Recording")
            setTimeout(() => setSeconds(1), 1000)
            break
         case "Recording":
            mediaRecorder.stop()
            mediaRecorder.ondataavailable = e => setMediaChunks(e.data)

            setRecordingState("Recorded")
            break
         case "Recorded":
            setNewMed({ ...newMed, audio_file: mediaChunks })

            const objectURL = URL.createObjectURL(mediaChunks)
            setPreviewUrl(objectURL)
            setRecordingState("Uploaded")
            break
         case "Uploaded":
            setPrepRecord(false)
            setRecordingState(false)
            setSeconds(0)
            setMinutes(0)
            setMediaChunks([])
            prepForRecording()
            break
      }
   }

   const handlePauseResume = () => {
      if (mediaRecorder.state === "paused") {
         mediaRecorder.resume()

         if (mediaRecorder.state === "inactive") {
            setErrors("Recorder is inactive")
         }
      } else {
         mediaRecorder.pause()
      }
   }

   useEffect(() => {
      let interval = setInterval(() => {
         if (mediaRecorder.state === "recording") {
            if (seconds >= 0) {
               setSeconds(seconds + 1)
            }
            if (seconds === 59) {
               setMinutes(minutes + 1)
               setSeconds(0)
            }
         }
         if (mediaRecorder.state === "paused" || mediaChunks.length > 0) {
            setSeconds(seconds)
            setMinutes(minutes)
         }
      }, 1000)
      return () => clearInterval(interval)
   }, [seconds])

   const handleNewMed = e => handleChange(e, setNewMed, newMed)
   const handleFile = e => setNewMed({ ...newMed, audio_file: e.target.files[0] })

   async function handleSubmit(e) {
      e.preventDefault()
      setLoading(true)
      const formData = new FormData()
      for (let key in newMed) {
         formData.append(key, newMed[key])
      }

      axios
         .post("http://localhost:3000/meditations", formData)
         .then(res => {
            debugger
            dispatch(addMed(res.data))
         })
         .then(() => {
            setLoading(false)
            setSuccess(true)
            setNewMed(initialState)
         })
   }

   const handleStayOnPage = () => {
      setSuccess(false)
      setPrepRecord(false)
      setRecordingState(false)
      setSeconds(0)
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
                  <IconButton onClick={() => history.push("/profile")}>
                     {" "}
                     <PageviewIcon />
                  </IconButton>
                  <IconButton onClick={handleStayOnPage}>
                     {" "}
                     <AddCircleIcon />
                  </IconButton>
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
               idLabel="Type"
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
            {recordingState !== "Uploaded" ? (
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
         <TightButton onClick={prepForRecording}>Record File</TightButton>
         <br />
         {prepRecord && (
            <Dialog open={prepRecord}>
               <DialogTitle>Recording Interface</DialogTitle>
               <DialogContent>
                  <p>
                     {minutes} : {seconds >= 10 ? seconds : `0${seconds}`}{" "}
                     {mediaRecorder.state === "paused" && "Paused"}
                  </p>
                  {recordingState === "Uploaded" && (
                     <>
                        <br />
                        <audio width="50%" controls src={previewUrl} />
                        <br />
                     </>
                  )}
               </DialogContent>
               <DialogActions>
                  <IconButton onClick={handleRecording}>
                     {recordingState === false ? (
                        <RecordVoiceOverIcon />
                     ) : recordingState === true ? (
                        <FiberManualRecordIcon />
                     ) : recordingState === "Recording" ? (
                        <StyledRecordingIcon />
                     ) : recordingState === "Recorded" ? (
                        <AttachFileIcon />
                     ) : (
                        <RedoIcon />
                     )}
                  </IconButton>
                  {recordingState === "Uploaded" && (
                     <IconButton onClick={() => setPrepRecord(false)}>
                        <CheckIcon />
                     </IconButton>
                  )}
                  {mediaRecorder.state !== "inactive" && (
                     <IconButton onClick={handlePauseResume}>
                        <StyledArrow /> <StyledPause />
                     </IconButton>
                  )}
               </DialogActions>
            </Dialog>
         )}
      </TightCard>
   )
}
