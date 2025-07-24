import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(data.error || 'Veri alınamadı');
      }
    } catch (err) {
      setError('Sunucuya ulaşılamadı');
      setWeather(null);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#E0F7F4', minHeight: '100vh' }}>
      <h2 style={{ color: '#2E7D32', marginBottom: '30px', textAlign: 'center' }}>🌤️ Hava Durumu Portalı</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '35px' }}>
        <input
          type="text"
          placeholder="Şehir girin..."
          value={city}
          onChange={e => setCity(e.target.value)}
          style={{
            padding: '14px',
            width: '320px',
            fontSize: '18px',
            border: '1px solid #bbb',
            borderRadius: '10px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
            outline: 'none',
          }}
        />
        <button onClick={getWeather} style={{
          marginLeft: '10px',
          padding: '14px 20px',
          fontSize: '16px',
          backgroundColor: '#2E7D32',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}>
          Getir
        </button>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {weather && (
        <div style={{
          maxWidth: '600px',
          margin: 'auto',
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#2A3B47', fontSize: '24px' }}>{city}</h3>
          <p style={{ fontSize: '18px' }}>🌡️ Sıcaklık: {weather.temperature}°C</p>
          <p style={{ fontSize: '18px' }}>💧 Nem: {weather.humidity}%</p>
          <p style={{ fontSize: '18px' }}>🌥️ Hava: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
