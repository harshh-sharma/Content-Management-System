import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Domain from './components/Domain'

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/domains' element={<Domain/>} />
    </Routes>
  )
}

export default App
