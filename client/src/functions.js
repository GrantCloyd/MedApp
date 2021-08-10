import { HEADERS } from "./constants"

export const handleChange = (e, setter, obj) => setter({ ...obj, [e.target.name]: e.target.value })

export const createConfig = (method, obj = "") => {
   return {
      method: method,
      headers: HEADERS,
      body: JSON.stringify(obj),
   }
}
