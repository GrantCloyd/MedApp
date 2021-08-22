import "./App.css"
import Landing from "./components/Landing"
import ProfilePage from "./components/ProfilePage"
import CreatePage from "./components/CreatePage"
import SearchMeditations from "./components/SearchMeditations"
import LogInPage from "./components/LogInPage"
import SignUpPage from "./components/SignUpPage"
import InteractPage from "./components/InteractPage"
import Navbar from "./components/Navbar"
import ViewTeacher from "./components/ViewTeacher"
import PlayMeditation from "./components/PlayMeditation"
import { Container } from "@material-ui/core"
import { Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import { gradient, Banner } from "./components/styles"

function App() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))

   if (user.name === "") {
      return (
         <div style={gradient}>
            <br />
            <Switch>
               <Container maxWidth="sm">
                  <Route path="/" exact component={LogInPage} />
                  <Route path="/signup" exact component={SignUpPage} />
               </Container>
            </Switch>
            <br />
         </div>
      )
   }

   return (
      <div className="App">
         <nav>
            <Navbar />
         </nav>
         <main>
            <Route path="/create" component={CreatePage} />

            <Route path="/landing" component={Landing} />

            <Route path="/profile" component={ProfilePage} />

            <Route path="/search" component={SearchMeditations} />

            <Route exact path="/playingnow/:id" component={PlayMeditation} />

            <Route exact path="/teachers/:id" component={ViewTeacher} />

            <Route exact path="/interact" component={InteractPage} />
         </main>
      </div>
   )
}

export default App
