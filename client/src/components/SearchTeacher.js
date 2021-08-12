import React from "react"
import { useHistory } from "react-router-dom"

export default function SearchTeacher({ meditations }) {
   const teachers = meditations
      .map(m => m.teacher)
      .reduce((acc, t) => acc.concat(acc.find(i => i.id === t.id) ? [] : [t]), [])

   const teachersDisplay = teachers.map(t => (
      <li key={t.id}>
         <img alt={t.name} src={t.image_url} /> <p>Name: {t.name} </p>
      </li>
   ))

   console.log(teachers)

   return (
      <div>
         <hr />
         You're looking for teachers!
         <ul>{teachersDisplay}</ul>
         <hr />
      </div>
   )
}
