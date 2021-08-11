import "./App.css"
import Landing from "./components/Landing"
import ProfilePage from "./components/ProfilePage"
import CreatePage from "./components/CreatePage"
import LogInPage from "./components/LogInPage"
import SignUpPage from "./components/SignUpPage"
import Navbar from "./components/Navbar"
import PlayMeditation from "./components/PlayMeditation"
import { Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"

function App() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))

   if (user.name === "") {
      return (
         <Switch>
            <Route path="/" exact component={LogInPage} />
            <Route path="/signup" exact component={SignUpPage} />
         </Switch>
      )
   }

   return (
      <div className="App">
         <h1>Med App</h1>
         <hr />
         <Navbar />

         <Route path="/create" component={CreatePage} />
         <hr />
         <Route path="/landing" component={Landing} />
         <hr />
         <Route path="/profile" component={ProfilePage} />
         <hr />
         <Route path="/playingnow" component={PlayMeditation} />
      </div>
   )
}

export default App
