import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Marketplace = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Бараануудаа дуудаж авах
                const res = await API.get('/cargo'); // Одоогоор cargo хүснэгтээ ашиглаж байгаа бол
                setProducts(res.data);
            } catch (err) {
                console.error("Бараа татахад алдаа гарлаа", err);
            }
        };
        fetchProducts();
    }, []);

    const handleOrder = async (cargoId) => {
        try {
            // Статусыг нь 'Pending' болгож захиалга үүсгэх логик
            await API.patch(`/cargo/${cargoId}`, { status: 'Pending' });
            alert("Захиалга амжилттай!");
            window.location.reload(); 
        } catch (err) {
            alert("Захиалахад алдаа гарлаа");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Барааны Marketplace</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(item => (
                    <div key={item.id} className="border p-4 rounded-lg shadow bg-white">
                        <h3 className="font-bold text-lg">{item.item_name}</h3>
                        <p className="text-gray-600 text-sm">Илгээгч: {item.sender}</p>
                        <button 
                            onClick={() => handleOrder(item.id)}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Захиалах
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;