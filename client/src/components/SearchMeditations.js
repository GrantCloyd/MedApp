import React, { useEffect, useState } from "react"
import SearchTeacher from "./SearchTeacher"
import SearchLength from "./SearchLength"
import SearchType from "./SearchType"

export default function SearchMeditations() {
   const [displayTeacher, setDisplayTeacher] = useState(false)
   const [displayType, setDisplayType] = useState(false)
   const [displayLength, setDisplayLength] = useState(false)

   useEffect(() => {
      async function getData() {
         const res = await fetch("/meditations")
         const data = await res.json()
         console.log(data)
      }
      getData()
   }, [])

   return (
      <div>
         <h2>Search Meditations</h2>

         <button onClick={() => setDisplayTeacher(!displayTeacher)}>By Teacher</button>
         <button onClick={() => setDisplayType(!displayType)}>By Type</button>
         <button onClick={() => setDisplayLength(!displayLength)}>By Length</button>
         {displayTeacher && <SearchTeacher />}
         {displayType && <SearchType />}
         {displayLength && <SearchLength />}
      </div>
   )
}
