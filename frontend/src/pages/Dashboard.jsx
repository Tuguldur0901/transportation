import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Dashboard = () => {
    const [cargo, setCargo] = useState([]);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchCargo = async () => {
            try {
                const res = await API.get('/cargo');
                setCargo(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCargo();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Сайн байна уу, {username}!</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Гарах</button>
            </div>
            {/* Ачааны жагсаалт энд хүснэгтээр гарна (Өмнөх App.jsx дээрх хүснэгтийг энд хийж болно) */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl mb-4">Ачааны жагсаалт</h2>
                {/* Хүснэгтийн код... */}
            </div>
        </div>
    );
};

export default Dashboard;