import React, { useEffect, useState } from "react"
import SearchTeacher from "./SearchTeacher"
import SearchLength from "./SearchLength"
import SearchType from "./SearchType"

export default function SearchMeditations() {
   const [displayTeacher, setDisplayTeacher] = useState(false)

   const [displayLength, setDisplayLength] = useState(false)
   const [meditations, setMeditations] = useState([])

   useEffect(() => {
      async function getData() {
         const res = await fetch("/meditations")
         const data = await res.json()
         setMeditations(data)
      }
      getData()
   }, [])

   return (
      <div>
         <h2>Search Meditations</h2>

         <button onClick={() => setDisplayTeacher(!displayTeacher)}>By Teacher</button>
         <button onClick={() => setDisplayLength(!displayLength)}>By Length or Type</button>
         {displayTeacher && <SearchTeacher meditations={meditations} />}

         {displayLength && <SearchLength meditations={meditations} />}
      </div>
   )
}
