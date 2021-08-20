import React from "react"
import { CardContent } from "@material-ui/core"

export default function MedLineItem({ m, clickHandler = null }) {
   return (
      <li>
         <CardContent>
            {" "}
            Title: {m.title} || Description: {m.description} || Type: {m.med_type} || Length:{" "}
            {m.est_length} minutes ||{" "}
            {clickHandler === null && m.listens !== undefined && `Listens: ${m.listens}`}
            {clickHandler && (
               <button onClick={clickHandler !== null ? () => clickHandler(m.id) : null}>
                  Play Now
               </button>
            )}
         </CardContent>
      </li>
   )
}
