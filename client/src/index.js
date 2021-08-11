import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import gloablstore from "./components/store/gloablstore"
//import { teacherReducer } from "./components/store/reducer"

ReactDOM.render(
   <Provider store={gloablstore}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>,
   document.getElementById("root")
)
