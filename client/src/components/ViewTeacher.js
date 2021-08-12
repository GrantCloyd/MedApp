import React, { useState, useEffect } from "react"
import MedLineItem from "./MedLineItem"
import { useParams, useHistory } from "react-router-dom"

export default function ViewTeacher() {
   const teacherId = useParams().id
   const [teacher, setTeacher] = useState({
      name: "",
      meditations: [],
   })
   const history = useHistory()
   const handleSelection = id => history.push(`/playingnow/${id}`)

   useEffect(() => {
      async function getTeacher() {
         const res = await fetch(`/teachers/${teacherId}`)
         const data = await res.json()
         console.log(data)
         setTeacher(data)
      }
      getTeacher()
   }, [])

   const meditationsDisplay = teacher.meditations.map(m => (
      <MedLineItem clickHandler={handleSelection} key={m.id} m={m} />
   ))

   return (
      <div>
         <h2>{teacher.name}</h2>
         <p>
            {" "}
            <img src={teacher.image_url} />
         </p>
         <p>{teacher.background}</p>
         <ul>{meditationsDisplay}</ul>
      </div>
   )
}
