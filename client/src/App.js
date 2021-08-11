import "./App.css"
import Landing from "./components/Landing"
import ProfilePage from "./components/ProfilePage"
import CreatePage from "./components/CreatePage"
import LogInPage from "./components/LogInPage"
import SignUpPage from "./components/SignUpPage"
import Navbar from "./components/Navbar"
import PlayMeditation from "./components/PlayMeditation"
import { Route, Switch } from "react-router-dom"
import { useState } from "react"

function App() {
   const [loggedIn, setLoggedIn] = useState(false)
   const [userData, setUserData] = useState(null)
   console.log(loggedIn, userData)

   const setLogInType = userType => setLoggedIn(userType)

   if (loggedIn === false) {
      return (
         <Switch>
            <Route
               path="/"
               exact
               component={() => <LogInPage setUserData={setUserData} setLogInType={setLogInType} />}
            />
            <Route path="/signup" exact component={SignUpPage} />
         </Switch>
      )
   }

   return (
      <div className="App">
         <h1>Med App</h1>
         <hr />
         <Navbar setLogInType={setLogInType} loggedIn={loggedIn} />

         <Route path="/create" component={() => <CreatePage userData={userData} />} />
         <hr />
         <Route path="/landing" component={() => <Landing loggedIn={loggedIn} />} />
         <hr />
         <Route
            path="/profile"
            component={() => <ProfilePage loggedIn={loggedIn} userData={userData} />}
         />
         <hr />
         <Route path="/playingnow" component={() => <PlayMeditation />} />
      </div>
   )
}

export default App
