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
import { primaryColor, secondaryColor } from "./components/styles"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loginT } from "./components/store/teacherReducer"
import { loginS } from "./components/store/studentReducer"
import { styled } from "@material-ui/core/styles"

const StyledDiv = styled("div")({
   background: `linear-gradient(45deg, ${primaryColor} 30%, ${secondaryColor} 90%)`,
   padding: "100px",
   align: "center",
   textAlign: "center",
})

function App() {
   let user = useSelector(state => (state.student.name === "" ? state.teacher : state.student))
   const dispatch = useDispatch()

   useEffect(() => {
      async function handleRefresh() {
         const res = await fetch("/me")
         const data = await res.json()
         console.log(data)
         if (data !== null) {
            data.image_url ? dispatch(loginT(data)) : dispatch(loginS(data))
         }
      }
      handleRefresh()
   }, [])

   if (user.name === "" || user.name === undefined) {
      return (
         <StyledDiv>
            <br />
            <Switch>
               <Container maxWidth="sm">
                  <Route exact path="/" component={LogInPage} />
                  <Route path="/signup" exact component={SignUpPage} />
               </Container>
            </Switch>
            <br />
         </StyledDiv>
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
