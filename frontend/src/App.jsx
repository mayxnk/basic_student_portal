import { Heading } from "../components/Heading"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from "../pages/SignUp"
import { Signin } from "../pages/Signin"
import { Dashboard } from "../pages/Dashboard"

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
