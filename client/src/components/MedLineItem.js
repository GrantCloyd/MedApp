import React from "react"

export default function MedLineItem({ m, clickHandler = null }) {
   return (
      <li onClick={() => clickHandler(m.id)}>
         {" "}
         Title: {m.title} || Description: {m.description} || Type: {m.med_type} || Length:{" "}
         {m.est_length}{" "}
      </li>
   )
}
