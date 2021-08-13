import React, { useState, useEffect } from "react"
import MedLineItem from "./MedLineItem"
import { createConfig } from "../functions"
import { useParams, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { addFollow, removeFollow } from "./store/studentReducer"
import { useDispatch } from "react-redux"

export default function ViewTeacher() {
   const teacherId = useParams().id
   const [teacher, setTeacher] = useState({
      name: "",
      meditations: [],
   })
   const history = useHistory()
   const userId = useSelector(state => state.student.id)
   const follows = useSelector(state => state.student.follows)
   const follow = follows.find(f => f.teacher_id === +teacherId)
   const followsTecherId = useSelector(state => state.student.follows).map(f => f.teacher_id)
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
      const configObj = createConfig("POST", {
         student_id: userId,
         teacher_id: teacherId,
      })
      const res = await fetch(`/follows`, configObj)
      const data = await res.json()
      console.log(data)
      dispatch(addFollow(data))
   }

   async function handleUnfollow() {
      const res = await fetch(`/follows/${follow.id}`, createConfig("DELETE"))
      const data = await res.json()
      console.log(data)
      dispatch(removeFollow(data))
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
         {followsTecherId.includes(+teacherId) ? (
            <button onClick={handleUnfollow}>Unfollow</button>
         ) : (
            <button onClick={handleFollow}> Follow</button>
         )}
         <ul>{meditationsDisplay}</ul>
      </div>
   )
}
