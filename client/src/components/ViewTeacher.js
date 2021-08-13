import React, { useState, useEffect } from "react"
import MedLineItem from "./MedLineItem"
import { createConfig } from "../functions"
import { useParams, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { addFollow, removeFollow } from "./store/studentReducer"
import { useDispatch } from "react-redux"
import FollowInfo from "./FollowInfo"

export default function ViewTeacher() {
   const teacherId = useParams().id
   const [teacher, setTeacher] = useState({
      name: "",
      meditations: [],
   })
   const [errors, setErrors] = useState(false)
   const history = useHistory()
   const user = useSelector(state => state.student)
   const userId = useSelector(state => state.student.id)
   const follows = useSelector(state => state.student.follows)
   const follow = follows.find(f => f.teacher_id === +teacherId)
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
   }, [])

   async function handleFollow() {
      setErrors(false)
      const configObj = createConfig("POST", {
         student_id: userId,
         teacher_id: teacherId,
      })
      const res = await fetch(`/follows`, configObj)
      const data = await res.json()
      if (data.id) {
         dispatch(addFollow(data))
      } else {
         setErrors(data.error)
      }
   }

   async function handleUnfollow() {
      setErrors(false)
      const res = await fetch(`/follows/${follow.id}`, createConfig("DELETE"))
      const data = await res.json()

      if (data.id) {
         dispatch(removeFollow(data.id))
      } else {
         setErrors(data.error)
      }
   }

   const meditationsDisplay = teacher.meditations.map(m => (
      <MedLineItem clickHandler={handleSelection} key={m.id} m={m} />
   ))

   return (
      <div>
         <h2>{teacher.name}</h2>
         <p>
            {" "}
            <img src={teacher.image_url} />
         </p>
         <p>{teacher.background}</p>
         {errors && <p>{errors}</p>}
         {followerStatus ? (
            <button onClick={handleUnfollow}>Unfollow</button>
         ) : (
            <button onClick={handleFollow}> Follow</button>
         )}
         {followerStatus ? (
            <FollowInfo
               teacherName={teacher.name}
               teacherId={teacherId}
               userId={user.id}
               userName={user.name}
            />
         ) : null}
         <ul>{meditationsDisplay}</ul>
      </div>
   )
}
