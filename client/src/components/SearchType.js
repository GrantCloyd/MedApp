import React, { useState } from "react"
import { medTypes } from "../constants"
import MedLineItem from "./MedLineItem"
import { useHistory } from "react-router-dom"

export default function SearchType({ meditations }) {
   const [toggleOpen, setToggleOpen] = useState(false)
   const [filter, setFiltered] = useState([])
   const history = useHistory()

   const handleSelection = id => history.push(`/playingnow/${id}`)

   const handleTypeFilter = e => {
      const filtered = meditations
         .filter(m => m.med_type === e.target.value)
         .map(m => <MedLineItem clickHandler={handleSelection} key={m.id} m={m} />)
      setFiltered(filtered)
      setToggleOpen(true)
   }

   return (
      <div>
         <hr />
         You're looking for types!
         <select onChange={handleTypeFilter}>{medTypes}</select>
         <ul>{toggleOpen && filter}</ul>
         <hr />
      </div>
   )
}
