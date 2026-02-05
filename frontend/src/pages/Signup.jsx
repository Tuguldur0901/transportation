import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Truck } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/signup', formData);
            alert("Амжилттай бүртгүүллээ! Одоо нэвтэрнэ үү.");
            navigate('/login'); // Бүртгүүлээд шууд Login руу
        } catch (err) {
            alert(err.response?.data?.error || "Бүртгэхэд алдаа гарлаа");
        }
    };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Truck size={32} />
        </div>
        <h1 className="auth-title">Бүртгүүлэх</h1>
        <p className="auth-subtitle">CargoHub системд шинээр нэгдэх</p>
        
        <form onSubmit={handleSignup}>
          <div className="form-group" style={{textAlign: 'left'}}>
            <label>Хэрэглэгчийн нэр</label>
            <input 
              className="input-field" 
              type="text" 
              placeholder="Жишээ нь: Boldoo123"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group" style={{textAlign: 'left'}}>
            <label>Нууц үг</label>
            <input 
              className="input-field" 
              type="password" 
              placeholder="Нууц үгээ энд бичнэ үү"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <button className="submit-btn" style={{marginTop: '1rem', background: '#0f172a'}}>
            Бүртгэл үүсгэх
          </button>
        </form>

        <p className="auth-footer">
          Бүртгэлтэй юу? 
          <span className="auth-link" onClick={() => navigate('/login')}>
            Нэвтрэх хэсэг рүү
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup; 