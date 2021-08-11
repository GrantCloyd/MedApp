import React, { useState } from "react"
import MeditationLi from "./MeditationLi"

export default function TeacherProfile({ income, meditations }) {
   const medDisplay = meditations.map(m => <MeditationLi key={m.id} m={m} />)

   return (
      <div>
         <h2>You're a teacher!</h2>
         <p>Teacher Stats</p>
         <p>Current Income: {income}</p>
         <p>Meditations</p>
         <ul>{medDisplay}</ul>
      </div>
   )
}
