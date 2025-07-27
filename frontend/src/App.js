import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import thermometerAnim from "./assets/lottie/thermometer.json";
import humidityAnim from "./assets/lottie/humidity.json";
import sunAnim from "./assets/lottie/sun.json";
import rainAnim from "./assets/lottie/rain.json";
import snowAnim from "./assets/lottie/snow.json";
import cloudAnim from "./assets/lottie/cloud.json";
import dayImg from "./assets/day.jpg";
import nightImg from "./assets/night.jpg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const favoritesPanelRef = useRef(null);

  // Saat bilgisi: 7-20 arası gündüz, diğerleri gece
  const isDaytime = () => {
    const hour = new Date().getHours();
    return hour >= 7 && hour < 20;
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    setFavoriteCities(storedFavorites);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showFavorites &&
        favoritesPanelRef.current &&
        !favoritesPanelRef.current.contains(event.target) &&
        !event.target.classList.contains("favorites-toggle-btn")
      ) {
        setShowFavorites(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFavorites]);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favoriteCities.filter(
        (c) => c.toLowerCase() !== city.toLowerCase()
      );
    } else {
      updatedFavorites = [...favoriteCities, city];
    }
    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const getWeather = async (searchCity = city) => {
    if (!searchCity.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/weather?city=${encodeURIComponent(searchCity)}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError("");
        const isFav = favoriteCities.some(
          (fav) => fav.toLowerCase() === searchCity.toLowerCase()
        );
        setIsFavorite(isFav);
        setCity(searchCity);
      } else {
        setWeather(null);
        setError(data.error || "Veri alınamadı");
      }
    } catch {
      setError("Sunucuya ulaşılamadı");
      setWeather(null);
    }
  };

  const getAnimation = (description) => {
    if (!description) return sunAnim;
    const desc = description.toLowerCase();
    if (desc.includes("güneş")) return sunAnim;
    if (desc.includes("yağmur")) return rainAnim;
    if (desc.includes("kar")) return snowAnim;
    if (desc.includes("bulut")) return cloudAnim;
    return sunAnim;
  };

  return (
    <div className="app-container">
      {/* Arka plan katmanı */}
      <div
        className="background-layer"
        style={{
          backgroundImage: `url(${isDaytime() ? dayImg : nightImg})`,
          filter: "brightness(0.4)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      {/* İçerik katmanı */}
      <h1 className="title">TikiTaka Hava Durumu Portalı</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Şehir girin..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value.trim() === "") {
              setWeather(null);
              setError("");
              setIsFavorite(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") getWeather();
          }}
        />
        <button onClick={() => getWeather()}>Getir</button>
      </div>

      <button
        className="favorites-toggle-btn"
        onClick={() => setShowFavorites((prev) => !prev)}
      >
        Favorilerim
      </button>

      {showFavorites && (
        <div className="favorites-panel" ref={favoritesPanelRef}>
          <h3>Favori Şehirler</h3>
          {favoriteCities.length === 0 ? (
            <p>Hiç favori yok.</p>
          ) : (
            favoriteCities.map((fav) => (
              <div
                key={fav}
                className="favorite-item"
                onClick={() => {
                  getWeather(fav);
                  setShowFavorites(false);
                }}
              >
                {fav}
              </div>
            ))
          )}
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          >
            {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
          </button>

          <h2>{city}</h2>

          <div className="weather-info-row">
            {/* Sıcaklık */}
            <div className="weather-info-item" style={{ color: "#e55858ff" }}>
              <Lottie
                animationData={thermometerAnim}
                loop
                autoplay
                style={{ width: 70, height: 70, margin: "0 auto" }}
              />
              <span>{weather.temperature}°C</span>
              <small>Sıcaklık</small>
            </div>

            {/* Nem */}
            <div className="weather-info-item" style={{ color: "#3b92d9ff" }}>
              <Lottie
                animationData={humidityAnim}
                loop
                autoplay
                style={{ width: 70, height: 70, margin: "0 auto" }}
              />
              <span>{weather.humidity}%</span>
              <small>Nem</small>
            </div>

            {/* Hava Durumu */}
            <div className="weather-info-item" style={{ color: "#ffc400ff" }}>
              <Lottie
                animationData={getAnimation(weather.description)}
                loop
                autoplay
                style={{ width: 70, height: 70, margin: "0 auto" }}
              />
              <span>{weather.description}</span>
              <small>Hava</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
