import React, { useState, useEffect } from "react"
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core"
import { makeIconBtn } from "../functions"
import { primaryColor, StyledArrow } from "./styles"
import PauseIcon from "@material-ui/icons/Pause"
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import RedoIcon from "@material-ui/icons/Redo"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import { styled } from "@material-ui/core/styles"

const StyledPause = styled(PauseIcon)({
   color: `${primaryColor}`,
})

const StyledRecordingIcon = styled(FiberManualRecordIcon)({
   color: `#BA1B1D`,
})

export default function RecordingDialog({
   setErrors,
   setPrepRecord,
   prepRecord,
   setNewMed,
   newMed,
   setAttachedCustom,
}) {
   const [recordingState, setRecordingState] = useState(false)
   const [mediaRecorder, setMediaRecorder] = useState(false)
   const [mediaChunks, setMediaChunks] = useState([])
   const [minutes, setMinutes] = useState(0)
   const [seconds, setSeconds] = useState(0)
   const [previewUrl, setPreviewUrl] = useState("")

   async function prepForRecording() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMediaRecorder(new MediaRecorder(stream, { mimeType: "audio/webm" }))
      setRecordingState(true)
   }

   const startRecording = () => {
      mediaRecorder.start()
      setRecordingState("Recording")
      setTimeout(() => setSeconds(1), 1000)
   }

   const stopAndCreateRecording = () => {
      mediaRecorder.stop()
      mediaRecorder.ondataavailable = e => setMediaChunks(e.data)
      setRecordingState("Recorded")
   }

   const attachRecordingAndPreview = () => {
      setNewMed({ ...newMed, audio_file: mediaChunks })
      const objectURL = URL.createObjectURL(mediaChunks)
      setPreviewUrl(objectURL)
      setRecordingState("Uploaded")
      setAttachedCustom(true)
   }

   const redoRecording = () => {
      setPrepRecord(true)
      setRecordingState(false)
      setSeconds(0)
      setMinutes(0)
      setMediaChunks([])
      prepForRecording()
      setAttachedCustom(false)
   }

   const handleCancelRecording = () => {
      setPrepRecord(false)
      setMediaChunks([])
      setAttachedCustom(false)
   }

   async function handleRecording() {
      switch (recordingState) {
         case false:
            prepForRecording()
            break
         case true:
            startRecording()
            break
         case "Recording":
            stopAndCreateRecording()
            break
         case "Recorded":
            attachRecordingAndPreview()
            break
         case "Uploaded":
            redoRecording()
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
            } else if (seconds === 59) {
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

   return (
      <Dialog open={prepRecord}>
         <DialogTitle>Recording Interface</DialogTitle>
         <DialogContent>
            <div align="center">
               <p>
                  {minutes} : {seconds >= 10 ? seconds : `0${seconds}`}{" "}
                  {mediaRecorder.state === "paused" && "Paused"}
               </p>
            </div>
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
            {recordingState === "Uploaded" && makeIconBtn(CheckIcon, () => setPrepRecord(false))}
            {mediaRecorder.state !== "inactive" && mediaRecorder.state !== undefined && (
               <IconButton onClick={handlePauseResume}>
                  <StyledArrow /> <StyledPause />
               </IconButton>
            )}
            {makeIconBtn(CloseIcon, handleCancelRecording)}
         </DialogActions>
      </Dialog>
   )
}
