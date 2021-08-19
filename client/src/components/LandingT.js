import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function LandingT({ chats, last_med }) {
   const [lastTime, setLastTime] = useState("")
   let lastMedTime

   useEffect(() => {
      const currTime = new Date()
      const currDay = currTime.getDate()
      const currMonth = currTime.getMonth()
      const currYear = currTime.getFullYear()
      const phrase = string => `It's been ${string} since you last made new content`

      if (last_med.length > 0) {
         lastMedTime = new Date(last_med[0].created_at)

         const mLastDay = lastMedTime.getDate()
         const mLastMonth = lastMedTime.getMonth()
         const mLastYear = lastMedTime.getFullYear()

         if (currYear === mLastYear && currMonth === mLastMonth && currDay === mLastDay) {
            setLastTime("Congrats on your new content!")
         } else if (currYear > mLastYear) {
            setLastTime(phrase("over a year"))
         } else if (currMonth > mLastMonth && currDay > mLastDay) {
            setLastTime(phrase("over a month"))
         } else if (currMonth > mLastMonth && currDay <= mLastDay) {
            setLastTime(phrase(`${30 - currDay + mLastDay} day(s)`))
         } else {
            setLastTime(phrase(`${currDay - mLastDay} day(s)`))
         }
      }
   }, [])

   return (
      <div>
         <h3>Updates:</h3>
         <p>
            {chats.length > 0
               ? `Open Questions: ${chats.length}`
               : "You have no questions currently"}
         </p>

         {last_med.length > 0 ? (
            <>
               <p>{lastTime}</p>
               <p>
                  You recorded "{last_med[0].title}" on{" "}
                  {new Date(last_med[0].created_at).toLocaleString()}
               </p>
            </>
         ) : (
            <p>
               {" "}
               You haven't recoreded any meditations. <Link to="/create">Start now!</Link>{" "}
            </p>
         )}
      </div>
   )
}
