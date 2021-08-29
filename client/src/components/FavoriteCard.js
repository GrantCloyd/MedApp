import React from "react"
import StudentMedButtons from "./StudentMedButtons"
import { TightCard } from "./styles"
import { CardContent, CardHeader } from "@material-ui/core"

export default function FavoriteCard({
   meditation,
   teacher_image,
   teacher_name,
   title,
   est_length,
   id,
   teacher_id,
}) {
   if (meditation === undefined) {
      return (
         <TightCard>
            <CardContent>
               {" "}
               <CardHeader title={title} />
               From: {teacher_name} <br /> {est_length} minutes
            </CardContent>
            <StudentMedButtons medId={id} teaId={teacher_id} teaImg={teacher_image} />{" "}
         </TightCard>
      )
   }

   return (
      <TightCard>
         <CardContent>
            {" "}
            <CardHeader title={meditation.title} />
            {teacher_name} <br /> {meditation.est_length} minutes
         </CardContent>
         <StudentMedButtons
            medId={meditation.id}
            teaId={meditation.teacher_id}
            teaImg={teacher_image}
         />
      </TightCard>
   )
}
