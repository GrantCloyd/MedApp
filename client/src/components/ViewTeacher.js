import React, { useState, useEffect } from "react"
import MedLineItem from "./MedLineItem"
import { createConfig } from "../functions"
import { useParams, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { addFollow, removeFollow } from "./store/studentReducer"
import { useDispatch } from "react-redux"
import FollowInfo from "./FollowInfo"
import { FormControlLabel, Grid } from "@material-ui/core"
import { StyledSwitch, StyledPaper } from "./styles"

export default function ViewTeacher() {
   const teacherId = useParams().id
   const [teacher, setTeacher] = useState({
      name: "",
      meditations: [],
   })
   const [errors, setErrors] = useState(false)
   const history = useHistory()
   const user = useSelector(state => state.student)
   const follow = user.follows.find(f => f.teacher_id === +teacherId)
   const followsTecherId = useSelector(state => state.student.follows).map(f => f.teacher_id)
   const followerStatus = followsTecherId.includes(+teacherId)
   const dispatch = useDispatch()
   const handleSelection = id => history.push(`/playingnow/${id}`)

   useEffect(() => {
      async function getTeacher() {
         const res = await fetch(`/teachers/${teacherId}`)
         const data = await res.json()

         setTeacher(data)
      }
      getTeacher()
   }, [teacherId])

   async function handleFollow() {
      const configObj = createConfig("POST", {
         student_id: user.id,
         teacher_id: teacherId,
      })

      const res = await fetch(`/follows`, configObj)
      const data = await res.json()

      data.id ? dispatch(addFollow(data)) : setErrors(data.error)
   }

   async function handleUnfollow() {
      const res = await fetch(`/follows/${follow.id}`, createConfig("DELETE"))
      const data = await res.json()

      data.id ? dispatch(removeFollow(data.id)) : setErrors(data.error)
   }

   async function handleFollowOrUnfollow(e) {
      setErrors(false)
      e.target.checked ? handleFollow() : handleUnfollow()
   }

   const meditationsDisplay = teacher.meditations.map(m => (
      <MedLineItem clickHandler={handleSelection} key={m.id} m={m} />
   ))

   return (
      <div>
         <div
            className="teacherPhoto"
            style={{
               backgroundColor: "transparent",
            }}>
            <h2>{teacher.name}</h2>
            <img
               src={teacher.image_url}
               alt={teacher.name}
               style={{ height: "500px", width: "100%", objectFit: "cover" }}
            />
            <StyledPaper>
               <p>{teacher.background}</p>
            </StyledPaper>
            {errors && <p>{errors}</p>}

            <FormControlLabel
               control={
                  <StyledSwitch
                     name="followSwitch"
                     checked={followerStatus}
                     onChange={handleFollowOrUnfollow}
                  />
               }
               label={followerStatus ? "Following" : "Not Following"}
            />
            {followerStatus ? (
               <FollowInfo
                  teacherName={teacher.name}
                  teacherId={teacherId}
                  userId={user.id}
                  userName={user.name}
                  optStatus={teacher.opt_in}
                  followMessage={teacher.follow_message}
               />
            ) : null}
         </div>
         <Grid container direction="row" justifyContent="center" alignItems="center">
            {meditationsDisplay}
         </Grid>
      </div>
   )
}
