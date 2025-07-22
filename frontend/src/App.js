import React, { useState } from 'react';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiStrongWind,
} from 'react-icons/wi';

// Şehir listesi
const cities = [
  'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa',
  'Adana', 'Trabzon', 'Eskişehir', 'Konya', 'Gaziantep',
  'Kayseri', 'Samsun', 'Mersin', 'Denizli', 'Malatya'
];

// Hava durumu tipleri, ikonları ve detayları
const weatherTypes = [
  {
    type: 'Güneşli',
    icon: <WiDaySunny size={36} color="#FFA726" />,
    description: 'Açık ve güneşli hava, sıcaklık yüksek.',
    humidity: 'Düşük nem',
    wind: 'Hafif rüzgar',
  },
  {
    type: 'Bulutlu',
    icon: <WiCloudy size={36} color="#90A4AE" />,
    description: 'Hafif bulutlu, ara sıra güneş görünebilir.',
    humidity: 'Orta nem',
    wind: 'Orta şiddette rüzgar',
  },
  {
    type: 'Yağmurlu',
    icon: <WiRain size={36} color="#4FC3F7" />,
    description: 'Yağmur var, dışarı çıkarken şemsiye almayı unutma.',
    humidity: 'Yüksek nem',
    wind: 'Sert rüzgar',
  },
  {
    type: 'Karlı',
    icon: <WiSnow size={36} color="#81D4FA" />,
    description: 'Kar yağışı, yollar kaygan olabilir.',
    humidity: 'Orta nem',
    wind: 'Hafif rüzgar',
  },
  {
    type: 'Rüzgarlı',
    icon: <WiStrongWind size={36} color="#A1887F" />,
    description: 'Rüzgar yoğun, dışarıda dikkatli olun.',
    humidity: 'Düşük nem',
    wind: 'Güçlü rüzgar',
  },
];

// Rastgele sıcaklık üret (0-40 derece arası)
const getRandomTemperature = () => Math.floor(Math.random() * 41);

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Şehirlere hava durumu ve detaylar ata (useMemo ile yalnızca 1 kere oluştur)
  const cityWeatherMap = React.useMemo(() => {
    const map = {};
    cities.forEach(city => {
      const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      const temperature = getRandomTemperature();
      map[city] = { ...weather, temperature };
    });
    return map;
  }, []);

  const filteredCities = (searchTerm.trim() === ''
  ? cities
  : cities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    )
).sort((a, b) => a.localeCompare(b, 'tr'));


  return (
    <div style={{
      padding: '40px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#E0F7F4',
      minHeight: '100vh',
    }}>
      <h2 style={{ color: '#2E7D32', marginBottom: '30px', textAlign: 'center' }}>
        🌤️ Hava Durumu Portalı
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '35px' }}>
        <input
          type="text"
          placeholder="Şehir ara..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
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
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, maxWidth: '600px', margin: 'auto' }}>
        {filteredCities.map(city => {
          const weather = cityWeatherMap[city];
          return (
            <li key={city} style={{
              marginBottom: '18px',
              padding: '20px 30px',
              borderRadius: '15px',
              backgroundColor: '#fff',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '600px',
              transition: 'transform 0.2s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ flex: 3 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#2A3B47', fontWeight: '700', fontSize: '22px' }}>
                  {city}
                </h3>
                <p style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#555' }}>
                  {weather.description}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#777' }}>
                  Nem: {weather.humidity} &nbsp;|&nbsp; Rüzgar: {weather.wind}
                </p>
              </div>

              <div style={{ flex: 1, textAlign: 'right', color: '#2E7D32', fontWeight: '700', fontSize: '24px' }}>
                {weather.temperature}°C
              </div>

              <div style={{ flex: 0.5, marginLeft: '20px' }}>
                {weather.icon}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
