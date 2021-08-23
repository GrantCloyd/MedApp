import React, { useEffect, useState } from "react"
import { makeLinkForBlob, createConfig } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { addPlay } from "./store/studentReducer"
import { useHistory, useParams } from "react-router-dom"
import { styled } from "@material-ui/core/styles"
import {
   CircularProgress,
   CardHeader,
   DialogActions,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   Box,
} from "@material-ui/core"
import {
   primaryColor,
   StyledPlayer,
   secondaryColor,
   TightCard,
   TightButton,
   ReverseTightButton,
} from "./styles"

const StyledProgress1 = styled(CircularProgress)({
   color: `${primaryColor}`,
})

const StyledProgress2 = styled(CircularProgress)({
   color: `${secondaryColor}`,
})

export default function PlayMeditation() {
   const initialState = {
      teacher: { image_url: "", name: "" },
   }
   const [medData, setMedData] = useState(initialState)
   const [playTime, setPlayTime] = useState(0)
   const [success, setSucess] = useState(false)
   const [pause, setPause] = useState(false)
   const [percent, setPercent] = useState(0)
   const userId = useSelector(state => state.student.id)
   const dispatch = useDispatch()
   const history = useHistory()
   const id = useParams().id

   useEffect(() => {
      async function getMed() {
         const res = await fetch(`/meditations/${id}`)
         const data = await res.json()
         setMedData(data)
      }
      getMed()
   }, [id])

   async function handleListen(successStatement) {
      const res = await fetch(
         "/plays",
         createConfig("POST", {
            student_id: userId,
            meditation_id: medData.id,
            length: Math.round(playTime / 60),
         })
      )
      const data = await res.json()
      dispatch(addPlay(data))
      setPause(false)
      setSucess(successStatement)
      setTimeout(() => history.push("/profile"), 2500)
   }

   const handleContinue = () => setPause(false)

   return (
      <TightCard>
         <CardHeader title={medData.title} />
         <p>
            <Box position="relative" display="inline-flex">
               <StyledProgress2 thickness={4} size={200} value={percent} variant="determinate" />
               <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <div dir="rtl">
                     <StyledProgress1
                        flip={false}
                        thickness={4}
                        size={100}
                        value={100 - percent}
                        variant="determinate"
                     />
                  </div>
               </Box>{" "}
            </Box>
         </p>
         {success && (
            <p>
               <Dialog open={success}>
                  {" "}
                  <DialogTitle>{"Congrats!"}</DialogTitle>
                  <DialogContent>
                     <DialogContentText>{success}</DialogContentText>
                  </DialogContent>
               </Dialog>
            </p>
         )}

         <p>{medData.teacher.name}</p>
         <p>{medData.description}</p>
         {pause && (
            <>
               <Dialog open={pause}>
                  {" "}
                  <DialogTitle>Paused</DialogTitle>
                  <DialogContent>
                     <DialogContentText>Would you like to continue your session?</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                     <TightButton onClick={handleContinue}>Continue</TightButton>
                     <ReverseTightButton onClick={() => handleListen("Every minute counts!")}>
                        End{" "}
                     </ReverseTightButton>
                     <TightButton onClick={() => history.push("/profile")}>Discard</TightButton>
                  </DialogActions>
               </Dialog>
            </>
         )}
         <StyledPlayer
            onPause={() => setPause(true)}
            onProgress={state => {
               setPercent(Math.round(state.played * 100))
               setPlayTime(state.playedSeconds)
            }}
            onSeek={() => setPause(false)}
            onEnded={() => handleListen("Congrats on finishing!")}
            playing={true}
            controls={true}
            height="50px"
            width="100%"
            url={makeLinkForBlob(medData.audio_file)}
         />
      </TightCard>
   )
}
