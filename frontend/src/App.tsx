import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer theme="dark" />
    </div>
  )
}

export default App
