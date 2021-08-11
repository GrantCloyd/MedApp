import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { makeLinkForBlob, createConfig } from "../functions"
import { useSelector } from "react-redux"

export default function PlayMeditation() {
   const initialState = {
      teacher: { image_url: "", name: "" },
   }
   const [medData, setMedData] = useState(initialState)
   const [playTime, setPlayTime] = useState(0)
   const userId = useSelector(state => state.student.id)

   //onPause create a pop-up that asks if you would like to conclude?

   useEffect(() => {
      async function getMed() {
         const res = await fetch("/meditations/9")
         const data = await res.json()
         setMedData(data)
      }
      getMed()
   }, [])

   async function handleListen() {
      const res = await fetch(
         "/plays",
         createConfig("POST", {
            student_id: userId,
            meditation_id: medData.id,
            length: Math.round(playTime / 60),
         })
      )
      const data = await res.json()
      console.log(data)
   }

   return (
      <div>
         <img alt="teacher-image" src={medData.teacher.image_url} />
         <p>{medData.teacher.name}</p>
         <h2>{medData.title}</h2>
         <p>{medData.description}</p>
         <ReactPlayer
            onPause={() => console.log(playTime)}
            onProgress={state => {
               setPlayTime(state.playedSeconds)
            }}
            onSeek={() => console.log("seeking")}
            onEnded={handleListen}
            playing={true}
            controls={true}
            height="50px"
            url={makeLinkForBlob(medData.audio_file)}
         />
      </div>
   )
}
