import React, { useState } from "react"
import MedLineItem from "./MedLineItem"
import { medTypes } from "../constants"
import { useHistory } from "react-router-dom"

export default function SearchLengthType({ meditations }) {
   const [toggleOpen, setToggleOpen] = useState(false)
   const [time, setTime] = useState(0)
   const [type, setType] = useState("--select-one--")
   const [filter, setFiltered] = useState(meditations)
   const history = useHistory()

   const handleSelection = id => history.push(`/playingnow/${id}`)

   const handleTypeFilter = e => {
      setType(e.target.value)
   }

   const handleLengthFilter = e => {
      setTime(e.target.value)
   }

   const handleFilter = (time, type) => {
      const filteredType = () => {
         if (type === "--select-one--") {
            return meditations
         } else {
            return meditations.filter(m => m.med_type === type)
         }
      }

      const filteredLength = () => {
         if (+time === 0) {
            return filteredType()
         }
         if (time < 30) {
            return filteredType().filter(m => m.est_length <= time && m.est_length >= time - 4)
         }
         if (time === 30) {
            return filteredType().filter(m => m.est_length <= time && m.est_length >= time - 9)
         } else {
            return filteredType().filter(m => m.est_length <= time && m.est_length >= time - 14)
         }
      }
      const filtered = filteredLength().map(m => (
         <MedLineItem clickHandler={handleSelection} key={m.id} m={m} />
      ))
      setFiltered(filtered)
      setToggleOpen(true)
   }

   return (
      <div>
         <hr />
         You're looking for Length!
         <select onChange={handleLengthFilter}>
            <select></select>
            <option value={0}>--select-one--</option>
            <option value={5}>5 Minutes</option>
            <option value={10}>10 Minutes</option>
            <option value={15}>15 Minutes</option>
            <option value={20}>20 Minutes</option>
            <option value={30}>30 Minutes</option>
            <option value={45}>45 Minutes</option>
            <option value={60}>60 Minutes</option>
         </select>
         You're looking for types!
         <select onChange={handleTypeFilter}>{medTypes}</select>
         <button onClick={() => handleFilter(time, type)}> Search!</button>
         <ul>{toggleOpen && filter}</ul>
         <hr />
      </div>
   )
}
