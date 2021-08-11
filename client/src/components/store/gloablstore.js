import { configureStore } from "@reduxjs/toolkit"
import teacherReducer from "./reducer"

export default configureStore({
   reducer: {
      teacher: teacherReducer,
   },
})
