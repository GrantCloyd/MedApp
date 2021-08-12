import React, { useState } from "react"
import MedLineItem from "./MedLineItem"
import { medTypes } from "../constants"
import { useHistory } from "react-router-dom"

export default function SearchLength({ meditations }) {
   const [toggleOpen, setToggleOpen] = useState(false)
   const [currFiltered, setCurrFiltered] = useState(false)
   const [filter, setFiltered] = useState(meditations)
   const history = useHistory()

   const handleSelection = id => history.push(`/playingnow/${id}`)

   const handleTypeFilter = e => {
      console.log(e.target.value)
      const filtered = meditations
         .filter(m => m.med_type === e.target.value)
         .map(m => <MedLineItem clickHandler={handleSelection} key={m.id} m={m} />)
      setFiltered(filtered)
      setCurrFiltered(true)
      if (e.target.value === "--select-one--") return setCurrFiltered(false)
      setToggleOpen(true)
   }

   const handleLengthFilter = e => {
      const time = e.target.value
      console.log(time)

      const filtered = () => {
         if (+time === 0) {
            setCurrFiltered(false)
            return meditations
         }
         if (time < 30) {
            return meditations.filter(m => m.est_length <= time && m.est_length >= time - 4)
         }
         if (time === 30) {
            return meditations.filter(m => m.est_length <= time && m.est_length >= time - 9)
         } else {
            return meditations.filter(m => m.est_length <= time && m.est_length >= time - 14)
         }
      }
      setFiltered(
         filtered().map(m => <MedLineItem clickHandler={handleSelection} key={m.id} m={m} />)
      )

      if (time > 0) return setCurrFiltered(true)
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
         <ul>{toggleOpen && filter}</ul>
         <hr />
      </div>
   )
}
