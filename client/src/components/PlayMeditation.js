import React, { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import { makeLinkForBlob } from "../functions"

export default function PlayMeditation() {
   const initialState = {
      teacher: { image_url: "", name: "" },
   }
   const [medData, setMedData] = useState(initialState)
   const [playTime, setPlayTime] = useState(0)

   useEffect(() => {
      async function getMed() {
         const res = await fetch("/meditations/10")
         const data = await res.json()
         setMedData(data)
         console.log(data)
      }
      getMed()
   }, [])

   const testing = () => {
      console.log(Math.round(playTime / 60))
   }

   testing()

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
            onEnded={() => console.log("Over")}
            playing={true}
            controls={true}
            height="50px"
            url={makeLinkForBlob(medData.audio_file)}
         />
      </div>
   )
}
