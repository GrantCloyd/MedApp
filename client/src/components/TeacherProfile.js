import React from "react"
import { useSelector } from "react-redux"
import MeditationLi from "./MeditationLi"

export default function TeacherProfile() {
   const user = useSelector(state => state.teacher)
   const medDisplay = user.meditations.map(m => <MeditationLi key={m.id} m={m} />)

   return (
      <div>
         <h2>Teacher Stats</h2>
         <p>Total Listens: {user.total_listens}</p>
         {user.donations.length > 0 ? (
            <>
               <p>Lifetime Income: ${Number(user.total_income).toFixed(2)}</p>
               <p>Current Income: ${Number(user.income).toFixed(2)}</p>
               {Number(user.income).toFixed(2) > 0 && <button>Withdraw</button>}
            </>
         ) : (
            <p> You've had no donations yet</p>
         )}
         <p>Open Questions: {user.chats.length}</p>
         <p>Followers: {user.follows.length}</p>
         <p>Meditations</p>
         <ul>{medDisplay}</ul>
      </div>
   )
}
