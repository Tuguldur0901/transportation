import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { LayoutDashboard, Box, PlusCircle, LogOut, Truck, Package, Clock, CheckCircle, MapPin, DollarSign, Weight } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cargoList, setCargoList] = useState([]);
  const [formData, setFormData] = useState({ 
    item_name: '', 
    sender: '', 
    receiver: '', 
    price: '', 
    weight: '', 
    delivery_type: 'Standard' 
  });
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchCargo = async () => {
      try { const res = await API.get('/cargo'); setCargoList(res.data); } catch (err) { console.log(err); }
    };
    fetchCargo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/cargo', formData);
      alert("Ачаа амжилттай бүртгэгдлээ!");
      setFormData({ item_name: '', sender: '', receiver: '', price: '', weight: '', delivery_type: 'Standard' });
      setActiveTab('overview');
      window.location.reload();
    } catch (err) { alert("Алдаа гарлаа"); }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo"><Truck /> CargoPro</div>
        <div className="nav-links">
          <div className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /> Хянах самбар
          </div>
          <div className={`nav-link ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
            <PlusCircle size={20} /> Шинэ тээвэр нэмэх
          </div>
        </div>
        <div className="nav-link" onClick={() => { localStorage.clear(); window.location.href='/login'; }}>
          <LogOut size={20} /> Гарах
        </div>
      </aside>

      <main className="main-content">
        <header className="top-nav">
          <h2>Тавтай морил, {username}!</h2>
          <div className="user-icon" style={{background: '#2563eb', color: 'white', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
            {username?.charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="content-padding">
          {activeTab === 'overview' && (
            <>
              <div className="stats-grid">
                <StatBox icon={<Package/>} label="Нийт ачаа" value={cargoList.length} />
                <StatBox icon={<Clock/>} label="Замдаа байгаа" value={cargoList.filter(c => c.status !== 'Delivered').length} />
                <StatBox icon={<DollarSign/>} label="Нийт орлого" value={cargoList.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0) + " ₮"} />
              </div>

              <h3>Ачааны дэлгэрэнгүй жагсаалт</h3>
              <div className="cargo-grid" style={{marginTop: '20px'}}>
                {cargoList.map(c => (
                  <div key={c.id} className="stat-card" style={{flexDirection: 'column', alignItems: 'flex-start', position: 'relative'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                      <span className="price-tag">{c.price} ₮</span>
                      <span className={`badge ${c.delivery_type === 'Express' ? 'badge-express' : 'badge-standard'}`}>
                        {c.delivery_type}
                      </span>
                    </div>
                    <h4 style={{fontSize: '1.2rem', fontWeight: '800'}}>{c.item_name}</h4>
                    <div className="cargo-details">
                      <span><MapPin size={14}/> {c.sender}</span>
                      <span>➔ {c.receiver}</span>
                      <span><Weight size={14}/> {c.weight} кг</span>
                      <span style={{color: '#2563eb', fontWeight: 'bold'}}>{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'add' && (
            <div className="form-card">
              <h2 style={{marginBottom: '2rem'}}>Тээвэрлэлтийн дэлгэрэнгүй бүртгэл</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Барааны нэр</label>
                  <input className="input-field" placeholder="Жишээ: iPhone 15" value={formData.item_name} onChange={e => setFormData({...formData, item_name: e.target.value})} required />
                </div>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div className="form-group">
                    <label>Жин (кг)</label>
                    <input type="number" className="input-field" placeholder="0.5" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Тээврийн үнэ (₮)</label>
                    <input type="number" className="input-field" placeholder="15000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Хүргэлтийн төрөл</label>
                  <select className="input-field" value={formData.delivery_type} onChange={e => setFormData({...formData, delivery_type: e.target.value})}>
                    <option value="Standard">Standard (2-3 хоног)</option>
                    <option value="Express">Express (24 цаг)</option>
                  </select>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div className="form-group">
                    <label>Илгээх цэг (Location)</label>
                    <input className="input-field" placeholder="Улаанбаатар" value={formData.sender} onChange={e => setFormData({...formData, sender: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Хүлээн авах цэг</label>
                    <input className="input-field" placeholder="Дархан" value={formData.receiver} onChange={e => setFormData({...formData, receiver: e.target.value})} />
                  </div>
                </div>

                <button className="submit-btn" style={{marginTop: '1rem'}}>Бүртгэлийг үүсгэх</button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div>
      <h3 style={{fontSize: '1.3rem'}}>{value}</h3>
      <p style={{fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase'}}>{label}</p>
    </div>
  </div>
);

export default Dashboard;