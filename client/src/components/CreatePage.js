import React, { useState, useEffect } from "react"
import { medTypes } from "../constants"
import { handleChange } from "../functions"
import { addMed } from "./store/teacherReducer"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

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
      const formData = new FormData()
      for (let key in newMed) {
         formData.append(key, newMed[key])
      }

      axios
         .post("http://localhost:3000/meditations", formData)
         .then(res => {
            const { id, title, med_type, audio_file, description, est_length, created_at } =
               res.data
            dispatch(
               addMed({ id, title, med_type, audio_file, description, est_length, created_at })
            )
         })
         .then(() => {
            setSuccess(true)
            setNewMed(initialState)
            setTimeout(() => history.push("/profile"), 2500)
         })
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
            {recordingState !== "Uploaded" ? (
               <>
                  {" "}
                  <label htmlFor="audio_file">Attach File</label>
                  <input onChange={handleFile} type="file" name="audio_file" />
               </>
            ) : (
               <p>File Attached</p>
            )}
            <button>Submit</button>
         </form>
         {recordingState === "Uploaded" && (
            <>
               <br />
               <audio width="50%" controls src={previewUrl} />
               <br />
            </>
         )}
         <button onClick={prepForRecording}>Record File</button>
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
