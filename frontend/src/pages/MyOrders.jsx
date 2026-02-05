import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await API.get('/orders/my-orders');
            setOrders(res.data);
        };
        fetchOrders();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Миний захиалгууд</h2>
            <div className="space-y-4">
                {orders.map(o => (
                    <div key={o.id} className="border p-4 rounded bg-gray-50 flex justify-between">
                        <div>
                            <p className="font-bold">Tracking ID: {o.tracking_id}</p>
                            <p className="text-sm">Төлөв: <span className="text-orange-500 font-bold">{o.status}</span></p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">{o.total_price} ₮</p>
                            <p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;