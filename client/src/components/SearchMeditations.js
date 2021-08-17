import React, { useEffect, useState } from "react"
import SearchTeacher from "./SearchTeacher"
import SearchLengthType from "./SearchLengthType"

export default function SearchMeditations() {
   const [displayTeacher, setDisplayTeacher] = useState(false)
   const [errors, setErrors] = useState(false)
   const [displayLength, setDisplayLength] = useState(false)
   const [meditations, setMeditations] = useState([])

   useEffect(() => {
      async function getData() {
         const res = await fetch("/meditations")
         const data = await res.json()
         if (data.id) {
            setMeditations(data)
         } else {
            setErrors(`Something went wrong : ${data.error}. Please try again`)
         }
      }
      getData()
   }, [])

   return (
      <div>
         <h2>Search Meditations</h2>
         {errors && <p>{errors}</p>}
         <button onClick={() => setDisplayTeacher(!displayTeacher)}>By Teacher</button>
         <button onClick={() => setDisplayLength(!displayLength)}>By Length or Type</button>

         {displayTeacher && <SearchTeacher meditations={meditations} />}

         {displayLength && <SearchLengthType meditations={meditations} />}
      </div>
   )
}
