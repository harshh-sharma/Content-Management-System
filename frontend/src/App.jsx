import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Domain from './components/Domain';
import Page from './components/Page';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import Login from './components/Login';
import Register from './components/Register';
import Section from './components/Section';
import Content from './components/Content';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/domains' element={<ProtectedRoute><Domain /></ProtectedRoute>} />
      <Route path='/:id/pages' element={<ProtectedRoute><Page /></ProtectedRoute>} />
      <Route path='/:id/sections' element={<ProtectedRoute><Section /></ProtectedRoute>} />
      <Route path='/:id/contents' element={<ProtectedRoute><Content /></ProtectedRoute>} />

    </Routes>
  );
}

export default App;
