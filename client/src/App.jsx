import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
import AdminDashBoard from './pages/AdminDashBoard';
import UserProtectedWrapper from './components/UserProtectedWrapper';
import AdminProtectedWrapper from './components/AdminProtectedWrapper';

const App = () => {
  // Example: get role from localStorage (adjust as needed)
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          role === 'admin' ? (
            <AdminProtectedWrapper>
              <AdminDashBoard />
            </AdminProtectedWrapper>
          ) : (
            <UserProtectedWrapper>
              <DashBoard />
            </UserProtectedWrapper>
          )
        } />
      </Routes>
    </Router>
  )
}

export default App