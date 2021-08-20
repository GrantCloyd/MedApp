import React from "react"
import { TightCard } from "./styles"
import { CardContent, CardHeader } from "@material-ui/core"
import StudentMedButtons from "./StudentMedButtons"

export default function RecentPlays({ meditation, created_at, teacher_name }) {
   return (
      <TightCard>
         <CardContent>
            <CardHeader title={meditation.title} />
            Listened on: {new Date(created_at).toLocaleString()} From: {teacher_name}
         </CardContent>
         <StudentMedButtons medId={meditation.id} teaId={meditation.teacher_id} />
      </TightCard>
   )
}
