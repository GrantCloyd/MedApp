import React from "react"
import { useSelector } from "react-redux"
import MeditationLi from "./MeditationLi"
import { Grid, CardHeader } from "@material-ui/core"
import { TightCard } from "./styles"

export default function TeacherProfile() {
   const user = useSelector(state => state.teacher)

   const medDisplay = user.meditations.map(m => <MeditationLi key={m.id} m={m} />)

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
                     {Number(user.most_donated_by_amount.amount).toFixed(2)})
                  </p>
                  <p>
                     {" "}
                     Most Donatations from a Student: {user.most_donated_student.student_name} (
                     {user.most_donated_student.amount})
                  </p>{" "}
                  <p>Lifetime Income: ${Number(user.total_income).toFixed(2)}</p>
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
