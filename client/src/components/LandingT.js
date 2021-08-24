import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createConfig, makeIconBtn } from "../functions"
import { updateIncome } from "./store/teacherReducer"
import { useSelector, useDispatch } from "react-redux"
import { Dialog, DialogTitle } from "@material-ui/core"
import { TightPaper, TightButton, PaddedDialogContent, StyledHelp } from "./styles"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent"
import { styled } from "@material-ui/styles"

const StyledMoney = styled(MonetizationOnIcon)({
   color: `green`,
})

const StyledLightBulb = styled(WbIncandescentIcon)({
   color: "#c79d1e",
})

export default function LandingT({ chats, last_med }) {
   const user = useSelector(state => state.teacher)
   const [lastTime, setLastTime] = useState("")
   const history = useHistory()
   const [message, setMessage] = useState(false)
   const dispatch = useDispatch()

   useEffect(() => {
      const currTime = new Date()
      const currDay = currTime.getDate()
      const currMonth = currTime.getMonth()
      const currYear = currTime.getFullYear()
      const phrase = string => `It's been ${string} since you last made new content.`

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
            setLastTime(
               phrase(`${30 - currDay + mLastDay} day${30 - currDay + mLastDay > 1 && "s"}`)
            )
         } else {
            setLastTime(phrase(`${currDay - mLastDay} day${currDay - mLastDay > 1 && "s"}`))
         }
      }
   }, [last_med])

   async function handleWithdraw() {
      setMessage(false)
      const res = await fetch(`/teachers/${user.id}`, createConfig("PATCH", { income: 0 }))
      const data = await res.json()
      if (data.id) {
         setMessage(`You've successfully withdrawn: $${(Number(user.income) * 0.8).toFixed(2)}`)
         setTimeout(() => {
            setMessage(false)
            dispatch(updateIncome(data))
         }, 2200)
      } else {
         setMessage(`Your information has not been updated, ${data.error}`)
      }
   }

   return (
      <div>
         <h3>Updates:</h3>
         <TightPaper>
            {makeIconBtn(StyledHelp, null)}
            {chats.length > 0 && chats[0].title.length > 0 ? (
               <p>
                  You have {chats.length} open question{chats.length > 1 && "s"}.
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
            {makeIconBtn(StyledLightBulb, null)}
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

         {message && (
            <Dialog open={message}>
               <DialogTitle> Withdrawl Information</DialogTitle>
               <PaddedDialogContent>{message}</PaddedDialogContent>
               <br />
            </Dialog>
         )}
         <TightPaper>
            {makeIconBtn(StyledMoney, null)}
            {Number(user.income).toFixed(2) > 0 && (
               <>
                  <p>Current Income: ${Number(user.income).toFixed(2)}</p>
                  <TightButton onClick={handleWithdraw}>Withdraw</TightButton>
                  <p>**Withdrawls are split 80/20 with Here|Now</p>
               </>
            )}
            {Number(user.income).toFixed(2) <= 0.0 && <p>You have no new income.</p>}
         </TightPaper>
      </div>
   )
}
