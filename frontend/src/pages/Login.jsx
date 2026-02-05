import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
        console.error("Алдаа гарлаа:", err.response?.data || err.message); // 3. Алдааг энд харна
        alert(err.response?.data?.error || "Сервертэй холбогдож чадсангүй");
    }
};

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Нэвтрэх</h2>
                <input 
                    type="text" placeholder="Хэрэглэгчийн нэр" 
                    className="w-full p-2 mb-4 border rounded"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <input 
                    type="password" placeholder="Нууц үг" 
                    className="w-full p-2 mb-6 border rounded"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Нэвтрэх</button>
                <p className="mt-4 text-sm text-center">
                    Бүртгэлгүй юу? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>Бүртгүүлэх</span>
                </p>
            </form>
        </div>
    );
};

export default Login;