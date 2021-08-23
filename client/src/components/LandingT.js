import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TightButton, TightPaper } from "./styles"

export default function LandingT({ chats, last_med }) {
   const [lastTime, setLastTime] = useState("")
   const history = useHistory()

   useEffect(() => {
      const currTime = new Date()
      const currDay = currTime.getDate()
      const currMonth = currTime.getMonth()
      const currYear = currTime.getFullYear()
      const phrase = string => `It's been ${string} since you last made new content`

      if (last_med.length > 0) {
         let lastMedTime = new Date(last_med[0].created_at)

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
   }, [last_med])

   return (
      <div>
         <h3>Updates:</h3>
         <TightPaper>
            {chats.length > 0 && chats[0].title.length > 0 ? (
               <p>
                  You have ${chats.length} open question{chats.length > 1 && "s"}
                  <br /> <br />
                  <TightButton onClick={() => history.push("/interact")}>
                     Go to Messages
                  </TightButton>{" "}
               </p>
            ) : (
               <p>You have no questions currently</p>
            )}
         </TightPaper>
         <TightPaper>
            {last_med.length > 0 ? (
               <>
                  <p>{lastTime}</p>
                  <p>
                     You recorded "{last_med[0].title}" on{" "}
                     {new Date(last_med[0].created_at).toLocaleString()} <br /> <br />
                  </p>
               </>
            ) : (
               <p> You haven't recorded any meditations yet. Start now!</p>
            )}
            <TightButton onClick={() => history.push("/create")}>Make Something New</TightButton>{" "}
         </TightPaper>
      </div>
   )
}
