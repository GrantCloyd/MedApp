import { HEADERS } from "./constants"
import { IconButton } from "@material-ui/core"

export const handleChange = (e, setter, obj) => setter({ ...obj, [e.target.name]: e.target.value })

export const createConfig = (method, obj = "") => {
   return {
      method: method,
      headers: HEADERS,
      body: JSON.stringify(obj),
   }
}

export const makeLinkForBlob = blob => {
   return `http://localhost:3000${blob}`
}

// add Styled or Unstyled Icon Component, the action for the button, and (opt) if it needs to be submitted in a form

export const makeIconBtn = (Icon, clickHandler, submitBool = null) => {
   return (
      <IconButton type={submitBool ? "submit" : null} onClick={clickHandler}>
         <Icon />
      </IconButton>
   )
}
