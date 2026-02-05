import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Truck } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Нэвтрэх үйлдэл эхэллээ...", formData); // 1. Энэ гарч ирж байна уу?

    try {
        const res = await API.post('/auth/login', formData);
        console.log("Backend-ээс хариу ирлээ:", res.data); // 2. Дата ирж байна уу?

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        
        console.log("Dashboard руу шилжиж байна...");
        navigate('/dashboard'); 
        window.location.reload(); // Шилжихгүй бол хүчээр релоад хийж шалгах
    } catch (err) {
        console.error("Алдаа гарлаа:", err.response?.data); // 3. Алдааг энд харна
        alert(err.response?.data?.error);
    }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Truck size={32} />
        </div>
        <h1 className="auth-title">Тавтай морил</h1>
        <p className="auth-subtitle">Системд нэвтэрч ачаагаа хянана уу</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{textAlign: 'left'}}>
            <label>Хэрэглэгчийн нэр</label>
            <input 
              className="input-field" 
              type="text" 
              placeholder="Нэрээ оруулна уу"
              onChange={(e) => setFormData({...formData, username: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group" style={{textAlign: 'left'}}>
            <label>Нууц үг</label>
            <input 
              className="input-field" 
              type="password" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <button className="submit-btn" style={{marginTop: '1rem'}}>Нэвтрэх</button>
        </form>

        <p className="auth-footer">
          Бүртгэлгүй юу? 
          <span className="auth-link" onClick={() => navigate('/signup')}>Шинээр бүртгүүлэх</span>
        </p>
      </div>
    </div>
  );
};

export default Login;