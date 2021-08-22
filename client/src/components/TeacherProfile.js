import React, { useState } from "react"
import { updateIncome } from "./store/teacherReducer"
import { useSelector, useDispatch } from "react-redux"
import MeditationLi from "./MeditationLi"
import { createConfig } from "../functions"
import { Grid, CardHeader } from "@material-ui/core"
import { TightCard } from "./styles"

export default function TeacherProfile() {
   const user = useSelector(state => state.teacher)
   const dispatch = useDispatch()
   const [errors, setMessage] = useState(false)

   const medDisplay = user.meditations.map(m => <MeditationLi key={m.id} m={m} />)

   async function handleWithdraw() {
      setMessage(false)
      const res = await fetch(`/teachers/${user.id}`, createConfig("PATCH", { income: 0 }))
      const data = await res.json()
      if (data.id) {
         setMessage(`You've successfully withdrawn: $${(Number(user.income) * 0.8).toFixed(2)}`)
         setTimeout(() => {
            setMessage(false)
            dispatch(updateIncome(data))
         }, 1500)
      } else {
         setMessage(`Your information has not been updated, ${data.error}`)
      }
   }

   return (
      <div>
         <TightCard>
            <CardHeader title="Teacher Stats" />
            <p>Total Listens: {user.total_listens}</p>
            {user.donations.length > 0 ? (
               <>
                  <p>
                     Highest Donation Amount from a Student:{" "}
                     {user.most_donated_by_amount.student_name} ($
                     {Number(user.most_donated_by_amount.amount).toFixed(2)} )
                  </p>
                  <p>
                     {" "}
                     Most Donatations from a Student: {
                        user.most_donated_student.student_name
                     } ( {user.most_donated_student.amount} )
                  </p>{" "}
                  <p>Lifetime Income: ${Number(user.total_income).toFixed(2)}</p>
                  <p>Current Income: ${Number(user.income).toFixed(2)}</p>
                  {errors && <p>{errors}</p>}
                  {Number(user.income).toFixed(2) > 0 && (
                     <>
                        <button onClick={handleWithdraw}>Withdraw</button>
                        <p>Withdrawls are split 80/20 with Here|Now</p>
                     </>
                  )}
               </>
            ) : (
               <p> You've had no donations yet</p>
            )}
            <p>Follows: {user.follows.length}</p>
         </TightCard>
         <h3>Meditations:</h3>
         <Grid container direction="row" justifyContent="center" alignItems="center">
            {medDisplay}
         </Grid>
      </div>
   )
}
