import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Шинэ бүртгэл</h2>
                <input 
                    type="text" placeholder="Хэрэглэгчийн нэр" 
                    className="w-full p-2 mb-4 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                />
                <input 
                    type="password" placeholder="Нууц үг" 
                    className="w-full p-2 mb-6 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                />
                <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                    Бүртгүүлэх
                </button>
                <p className="mt-4 text-sm text-center">
                    Аль хэдийн бүртгэлтэй юу? <span className="text-blue-600 cursor-pointer font-bold" onClick={() => navigate('/login')}>Нэвтрэх</span>
                </p>
            </form>
        </div>
    );
};

export default Signup;