import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Not_found from "./pages/not_found"

  function App() {

    return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/:slug" element={<Not_found/>} />
    </Routes>
    
    </BrowserRouter>
    )
  }

export default App
