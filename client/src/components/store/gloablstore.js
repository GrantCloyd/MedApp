import { configureStore } from "@reduxjs/toolkit"
import teacherReducer from "./teacherReducer"
import studentReducer from "./studentReducer"

export default configureStore({
   reducer: {
      teacher: teacherReducer,
      student: studentReducer,
   },
})
