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
} from "@material-ui/core"
import { styled } from "@material-ui/core/styles"
import { TightButton, ReverseTightButton } from "./styles"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"

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

   console.log(newMed.audio_file.name)

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
      <div>
         <h2>Create and Upload </h2>
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
                  <button onClick={() => history.push("/profile")}>View</button>
                  <button onClick={handleStayOnPage}>Stay</button>
               </DialogActions>
            </Dialog>
         )}
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
            <Select name="med_type" onChange={handleNewMed}>
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
               value={newMed.est_length}
               onChange={handleNewMed}
               type="number"
               name="est_length"
               placeholder="length"
            />
            {recordingState !== "Uploaded" ? (
               <>
                  {" "}
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
                     <IconButton component="span">
                        {" "}
                        <CloudUploadIcon />
                     </IconButton>
                  </label>
               </>
            ) : (
               <p>File Attached</p>
            )}
            <ReverseTightButton onClick={handleSubmit}>Submit</ReverseTightButton>
         </form>
         {recordingState === "Uploaded" && (
            <>
               <br />
               <audio width="50%" controls src={previewUrl} />
               <br />
            </>
         )}
         <TightButton onClick={prepForRecording}>Record File</TightButton>
         <br />
         {prepRecord && (
            <>
               <p>
                  {minutes} : {seconds >= 10 ? seconds : `0${seconds}`}
               </p>
               <button onClick={handleRecording}>
                  {recordingState === false
                     ? "Enable to Record ⭕️"
                     : recordingState === true
                     ? "Ready ⚪️"
                     : recordingState === "Recording"
                     ? "Recording 🔴"
                     : recordingState === "Recorded"
                     ? "Attach 📎"
                     : "Start Again? 🔁"}
               </button>
               {mediaRecorder.state !== "inactive" && (
                  <button onClick={handlePauseResume}>Pause/Resume ⏯</button>
               )}
            </>
         )}
      </div>
   )
}
