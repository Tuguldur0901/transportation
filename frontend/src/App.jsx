import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup'; // Энийг нэмнэ
import Dashboard from './pages/Dashboard';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Нэвтрэх болон Бүртгүүлэх замууд */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 

        {/* Хамгаалагдсан зам */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* Бусад бүх тохиолдолд Login руу */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;