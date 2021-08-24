import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { CardHeader, CardMedia, ButtonGroup, CardContent, Grid } from "@material-ui/core"
import { TightButton, ReverseTightButton, TightCard } from "./styles"
import { styled } from "@material-ui/core/styles"

const TeacherPictureSmall = styled(CardMedia)({
   height: "200px",
})

export default function SearchTeacher({ meditations }) {
   const teachers = meditations
      .map(m => m.teacher)
      .reduce((acc, t) => acc.concat(acc.find(i => i.id === t.id) ? [] : [t]), [])
   const [sortedTeachers, setSortedTeachers] = useState([])
   const history = useHistory()

   useEffect(() => {
      setSortedTeachers(teachers)
   }, [])

   const handleAlphSort = () =>
      setSortedTeachers(teachers.sort((a, b) => a.name.localeCompare(b.name)))

   const handleListenSort = () =>
      setSortedTeachers(teachers.sort((a, b) => b.total_listens - a.total_listens))

   const teachersDisplay = sortedTeachers.map(t => (
      <TightCard onClick={() => history.push(`/teachers/${t.id}`)} key={t.id}>
         <CardHeader title={t.name} />
         <TeacherPictureSmall alt={t.name} image={t.image_url} />
         <CardContent>
            Listens: {t.total_listens} <br /> Meditations: {t.med_number}
         </CardContent>
      </TightCard>
   ))

   return (
      <div>
         <h2>Discover New Teachers</h2>
         <p>
            <ButtonGroup>
               <TightButton onClick={handleAlphSort}>By Name</TightButton>{" "}
               <ReverseTightButton onClick={handleListenSort}>By Popularity</ReverseTightButton>
            </ButtonGroup>
         </p>
         <Grid container direction="column" justifyContent="center" alignItems="center">
            {teachersDisplay}
         </Grid>
      </div>
   )
}
