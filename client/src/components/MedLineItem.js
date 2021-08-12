import React from "react"

export default function MedLineItem({ m, clickHandler = null }) {
   return (
      <li onClick={clickHandler !== null ? () => clickHandler(m.id) : null}>
         {" "}
         Title: {m.title} || Description: {m.description} || Type: {m.med_type} || Length:{" "}
         {m.est_length}{" "}
      </li>
   )
}
