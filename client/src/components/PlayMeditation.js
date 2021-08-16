import React, { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import { makeLinkForBlob, createConfig } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { addPlay } from "./store/studentReducer"
import { useHistory, useParams } from "react-router-dom"

export default function PlayMeditation() {
   const initialState = {
      teacher: { image_url: "", name: "" },
   }
   const [medData, setMedData] = useState(initialState)
   const [playTime, setPlayTime] = useState(0)
   const [success, setSucess] = useState(false)
   const [pause, setPause] = useState(false)
   const userId = useSelector(state => state.student.id)
   const dispatch = useDispatch()
   const history = useHistory()
   const id = useParams().id

   //onPause create a pop-up that asks if you would like to conclude?

   useEffect(() => {
      async function getMed() {
         const res = await fetch(`/meditations/${id}`)
         const data = await res.json()
         setMedData(data)
      }
      getMed()
   }, [id])

   async function handleListen(successStatement) {
      const res = await fetch(
         "/plays",
         createConfig("POST", {
            student_id: userId,
            meditation_id: medData.id,
            length: Math.round(playTime / 60),
         })
      )
      const data = await res.json()

      dispatch(addPlay(data))
      setSucess(successStatement)
      setTimeout(() => history.push("/profile"), 2500)
   }

   const handleContinue = () => setPause(false)

   return (
      <div>
         <img alt={medData.teacher.name} src={medData.teacher.image_url} />
         <p>{medData.teacher.name}</p>
         <h2>{medData.title}</h2>
         <p>{medData.description}</p>
         {pause && (
            <>
               <p> Would you like to continue meditating or end your session?</p>
               <button onClick={handleContinue}>Continue</button>
               <button onClick={() => handleListen("Every minute counts!")}>End</button>
            </>
         )}
         <ReactPlayer
            onPause={() => setPause(true)}
            onProgress={state => {
               setPlayTime(state.playedSeconds)
            }}
            onSeek={() => setPause(false)}
            onEnded={() => handleListen("Congrats on finishing!")}
            playing={true}
            controls={true}
            height="50px"
            url={makeLinkForBlob(medData.audio_file)}
         />
         {success && <p>{success}</p>}
      </div>
   )
}
