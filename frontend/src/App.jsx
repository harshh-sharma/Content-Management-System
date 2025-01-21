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
import Dashboard from './components/Dashboard';
import Unauthorized from './components/Unauthorizied';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/domains' element={<ProtectedRoute ><Domain /></ProtectedRoute>} />
      <Route path='/:id/pages' element={<ProtectedRoute requiredRole={['ADMIN','SUPERADMIN']}><Page /></ProtectedRoute>} />
      <Route path='/:id/sections' element={<ProtectedRoute requiredRole={['ADMIN','SUPERADMIN']}><Section /></ProtectedRoute>} />
      <Route path='/:id/contents' element={<ProtectedRoute requiredRole={'ADMIN'}><Content /></ProtectedRoute>} />
      <Route path='/dashboard' element={<ProtectedRoute requiredRole={'SUPERADMIN'}><Dashboard /></ProtectedRoute>} />

      <Route path='/unauthorized' element={<Unauthorized/>} />


    </Routes>
  );
}

export default App;
