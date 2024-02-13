import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './Pages/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
