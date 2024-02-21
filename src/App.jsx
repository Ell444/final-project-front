import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './Pages/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SignUser from './components/SignUser'
import { useUser } from './context/UserContext'
import NotFound from './Pages/NotFound'
import Pokedex from './Pages/Pokedex'
import MyTeam from './Pages/MyTeam'
import CustomPokemon from './components/CustomPokemon'


function App() {

  const { user } = useUser();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={!user ? <SignUser type='signup' /> : <Navigate to="/" />} />
        <Route path='/login' element={!user ? <SignUser type='login' /> : <Navigate to="/" />} />
        <Route path='/pokemons' element={<Pokedex />} />
        <Route path='/myteam' element={<MyTeam />} />
        <Route path='/custompokemons/:id' element={<CustomPokemon />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
