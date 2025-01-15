import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Domain from './components/Domain'
import Page from './components/Page'

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/domains' element={<Domain/>} />
        <Route path='/:id/pages' element={<Page/>} />
    </Routes>
  )
}

export default App
