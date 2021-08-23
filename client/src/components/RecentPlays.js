import React from "react"
import { TightCard } from "./styles"
import { CardContent, CardHeader } from "@material-ui/core"
import StudentMedButtons from "./StudentMedButtons"

export default function RecentPlays({ meditation, created_at, teacher_name, teacher_image }) {
   return (
      <TightCard>
         <CardContent>
            <CardHeader title={meditation.title} />
            {teacher_name} <br /> {meditation.est_length} minutes <br /> Listened on:{" "}
            {new Date(created_at).toLocaleString()}
         </CardContent>
         <StudentMedButtons
            medId={meditation.id}
            teaId={meditation.teacher_id}
            teaImg={teacher_image}
         />
      </TightCard>
   )
}
