import styles from "./App.module.css";
import Alert from "./Components/Alert/Alert";
import Form from "./Components/Form/Form";
import Modal from "./Components/Modal/Modal";
import Spiner from "./Components/Spiner/Spiner";
import WeatherDetail from "./Components/WeatherDetail/WeatherDetail";
import useWeather from "./Hooks/useWeather";
import React, { useState, useEffect } from 'react';
function App() {
  const {fetchWeather, weather, hasWeatherData, loading, notFound} = useWeather()
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const lastShown = localStorage.getItem('modalShown');
  //   const now = new Date();

  //   if (!lastShown || new Date(lastShown).toDateString() !== now.toDateString()) {
  //     setIsModalOpen(true);
  //     localStorage.setItem('modalShown', now.toDateString());
  //   }
  // }, []);

  useEffect(() => {
    const checkModalTime = () => {
      const lastShown = localStorage.getItem('modalShown');
      const now = new Date().getTime();
      const twoMinutes = 2 * 60 * 1000; // 2 minutos en milisegundos

      if (!lastShown || now - parseInt(lastShown) > twoMinutes) {
        setIsModalOpen(true);
        localStorage.setItem('modalShown', now.toString());
      }
    };

    checkModalTime(); // Check immediately on mount
    const intervalId = setInterval(checkModalTime, 1000); // Check every second

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div className={styles.container}>
        <Form
          fetchWeather = {fetchWeather}
        /> 
        {loading && <Spiner/>}
        {hasWeatherData &&
          <WeatherDetail
          weather ={weather}/>
        }
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
