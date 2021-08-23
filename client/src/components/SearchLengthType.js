import React, { useState } from "react"
import MedLineItem from "./MedLineItem"
import { useHistory } from "react-router-dom"
import { TightButton, StyledDropDown } from "./styles"
import { InputLabel, MenuItem, Grid, FormControl } from "@material-ui/core"

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

   const filteredType = type => {
      if (type === "--select-one--") {
         return meditations
      } else {
         return meditations.filter(m => m.med_type === type)
      }
   }
   const filteredLength = (array, time) => {
      if (+time === 0) {
         return array
      }
      if (time < 30) {
         return array.filter(m => m.est_length <= time && m.est_length >= time - 4)
      }
      if (time === 30) {
         return array.filter(m => m.est_length <= time && m.est_length >= time - 9)
      } else {
         return array.filter(m => m.est_length <= time && m.est_length >= time - 14)
      }
   }

   const handleFilter = (time, type) => {
      const filtered = filteredLength(filteredType(type), time).map(m => (
         <MedLineItem clickHandler={handleSelection} key={m.id} m={m} />
      ))
      setFiltered(filtered)
      setToggleOpen(true)
   }

   return (
      <div>
         <FormControl>
            <InputLabel id="length">Length </InputLabel>
            <StyledDropDown labelId="length" onChange={handleLengthFilter}>
               <MenuItem value={0}>--select-one--</MenuItem>
               <MenuItem value={5}>5 Minutes</MenuItem>
               <MenuItem value={10}>10 Minutes</MenuItem>
               <MenuItem value={15}>15 Minutes</MenuItem>
               <MenuItem value={20}>20 Minutes</MenuItem>
               <MenuItem value={30}>30 Minutes</MenuItem>
               <MenuItem value={45}>45 Minutes</MenuItem>
               <MenuItem value={60}>60 Minutes</MenuItem>
            </StyledDropDown>
         </FormControl>{" "}
         {""}
         <FormControl>
            <InputLabel labelId="type">Type</InputLabel>
            <StyledDropDown id="type" onChange={handleTypeFilter}>
               <MenuItem value="--select-one--"> --select-one--</MenuItem>
               <MenuItem value="Breath">Breath</MenuItem>
               <MenuItem value="Awareness">Awareness</MenuItem>
               <MenuItem value="Emotions">Emotions</MenuItem>
               <MenuItem value="Metta">Metta</MenuItem>
               <MenuItem value="Insight">Insight</MenuItem>
               <MenuItem value="Bodyscan">Body Scan</MenuItem>
               <MenuItem value="Listening">Listening</MenuItem>
               <MenuItem value="Seeing">Seeing</MenuItem>
               <MenuItem value="Walking">Walking</MenuItem>
               <MenuItem value="Concentration">Concentration</MenuItem>
               <MenuItem value="Nondual">Non-Dual</MenuItem>
               <MenuItem value="Sleep">Sleep</MenuItem>
            </StyledDropDown>
         </FormControl>
         <br />
         <br />
         <TightButton onClick={() => handleFilter(time, type)}> Search!</TightButton>
         <br />
         <br />
         <Grid container direction="row" justifyContent="center" alignItems="center">
            {toggleOpen && filter}
         </Grid>
      </div>
   )
}
