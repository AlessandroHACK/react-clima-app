import React from 'react';
import { WeatherType } from '../../Hooks/useWeather';
import { formatTemperature } from '../../utils';
import styles from './WeatherDetail.module.css';

type WeatherDetailProps = {
  weather: WeatherType;
};

const WeatherDetail = ({ weather }: WeatherDetailProps) => {

  const getBackgroundClass = (temp: number) => {
    if (temp < 10) {
      return styles.cold;
    } else if (temp >= 10 && temp <= 20) {
      return styles.moderate;
    } else {
      return styles.warm;
    }
  };

  const backgroundClass = getBackgroundClass(formatTemperature(weather.main.temp));

  return (
    <div className={`${styles.container} ${backgroundClass}`}>
      <h2>Clima de: {weather.name}</h2>
      <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className={styles.temperatures}>
        <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
        <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
      </div>
    </div>
  );
};

export default WeatherDetail;
