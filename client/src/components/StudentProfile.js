import React, { useState } from "react"
import { useSelector } from "react-redux"
import RecentPlays from "./RecentPlays"
import { TightButton, TightPaper } from "./styles"

export default function StudentProfile() {
   const user = useSelector(state => state.student)
   const recentPlay = user.recent_plays
   const recentPlays = user.recent_plays.slice(1, 5)
   const [showRecent, setShowRecent] = useState(false)

   let mostRecent, recentMeds

   if (recentPlay.length > 0) {
      mostRecent = [recentPlay[0]].map(m => <RecentPlays key={m.id} {...m} />)

      recentMeds = recentPlays.map(m => (
         <li key={m.id}>
            <RecentPlays {...m} />
         </li>
      ))
   }

   return (
      <div>
         <TightPaper elevation={2}>
            <h2>Stats:</h2>
            {user.total_listens > 0 ? (
               <p> Total Sessions: {user.total_listens}</p>
            ) : (
               <p>No meditations yet</p>
            )}
            <p>Total Time Meditated: {user.total_time} minutes </p>
         </TightPaper>

         <h3>Donations</h3>
         {user.donations.length > 0 ? (
            <TightPaper elevation={2}>
               {" "}
               <p> Total: ${Number(user.total_donations).toFixed(2)}</p>
               <p> Number of Donations: {user.donations.length}</p>
               <p>
                  Most Donated by Amount to a Teacher: {user.most_donated_by_amount.teacher_name} ($
                  {Number(user.most_donated_by_amount.amount).toFixed(2)})
               </p>
               <p>
                  {" "}
                  Most Donatations to a Teacher: {user.most_donated_teacher.teacher_name} (
                  {user.most_donated_teacher.amount})
               </p>{" "}
            </TightPaper>
         ) : (
            <p>You've made no donations yet</p>
         )}
         <h3>Recent Sessions:</h3>
         {mostRecent}
         <TightButton onClick={() => setShowRecent(!showRecent)}>Show More Recent</TightButton>
         {showRecent && <ul>{recentMeds}</ul>}
      </div>
   )
}
