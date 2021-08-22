import React from "react"
import { CardContent, Paper, CardHeader, Avatar, IconButton } from "@material-ui/core"
import { TightCard, primaryColor, StyledArrow } from "./styles"
import TimerIcon from "@material-ui/icons/Timer"
import InfoIcon from "@material-ui/icons/Info"
import { styled } from "@material-ui/core/styles"

const StyledInfo = styled(InfoIcon)({
   color: `${primaryColor}`,
   marginBottom: "-5px",
})

const StyledAvatar = styled(Avatar)({
   marginBottom: "-15%",
   height: "50px",
   width: "50px",
   marginLeft: "8px",
})

export default function MedLineItem({ m, clickHandler = null }) {
   return (
      <TightCard>
         <p>
            <StyledAvatar alt={m.teacher.name} src={m.teacher.image_url} />
         </p>
         <CardHeader title={m.title}> </CardHeader>

         <CardContent>
            <Paper style={{ padding: "10px" }}>
               {" "}
               Type: {m.med_type} <br /> <br /> <StyledInfo /> {m.description}
            </Paper>{" "}
            <IconButton>
               <TimerIcon />
            </IconButton>
            {m.est_length} minutes{" "}
            {clickHandler === null && m.listens !== undefined && (
               <>
                  {" "}
                  <br /> Listens: {m.listens}
               </>
            )}
            {clickHandler && (
               <IconButton onClick={clickHandler !== null ? () => clickHandler(m.id) : null}>
                  <StyledArrow />
               </IconButton>
            )}
         </CardContent>
      </TightCard>
   )
}
