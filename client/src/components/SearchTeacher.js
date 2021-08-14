import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export default function SearchTeacher({ meditations }) {
   const teachers = meditations
      .map(m => m.teacher)
      .reduce((acc, t) => acc.concat(acc.find(i => i.id === t.id) ? [] : [t]), [])
   const [sortedTeachers, setSortedTeachers] = useState([])
   const history = useHistory()

   useEffect(() => {
      setSortedTeachers(teachers)
   }, [teachers])

   const handleAlphSort = () =>
      setSortedTeachers(teachers.sort((a, b) => a.name.localeCompare(b.name)))

   const handleListenSort = () =>
      setSortedTeachers(teachers.sort((a, b) => a.total_listens > b.total_listens))

   const teachersDisplay = sortedTeachers.map(t => (
      <li onClick={() => history.push(`/teachers/${t.id}`)} key={t.id}>
         <img alt={t.name} src={t.image_url} />{" "}
         <p>
            Name: {t.name} || Listens: {t.total_listens}
         </p>
      </li>
   ))

   console.log(sortedTeachers)

   return (
      <div>
         <hr />
         <h2>Discover New Teachers</h2>
         <p>
            <button onClick={handleAlphSort}>Sort by Name</button>
            <button onClick={handleListenSort}>Sort by Popularity</button>
         </p>
         <ul>{teachersDisplay}</ul>
         <hr />
      </div>
   )
}
