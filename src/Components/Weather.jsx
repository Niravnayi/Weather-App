import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import clear_icon from "../assets/icons/clear.png";
import cloud_icon from "../assets/icons/cloud.png";
import drizzle_icon from "../assets/icons/drizzle.png";
import rain_icon from "../assets/icons/rain.png";
import snow_icon from "../assets/icons/snow.png";
import wind_icon from "../assets/icons/wind.png";
import humidity_icon from "../assets/icons/humidity.png";
import clear_bg from "../assets/Background/DaySunny.jpg";
import cloud_bg from "../assets/Background/cloudy.jpg";
import drizzle_bg from "../assets/Background/rain.jpg";
import rain_bg from "../assets/Background/Thunderstorm.jpg";
import snow_bg from "../assets/Background/snow.jpg";
import sunset_bg from "../assets/Background/sunset.jpg";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(sunset_bg);

  const inputRef = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const backgroundImages = {
    "01d": clear_bg,
    "01n": clear_bg,
    "02d": cloud_bg,
    "02n": cloud_bg,
    "03d": cloud_bg,
    "03n": cloud_bg,
    "04d": cloud_bg,
    "04n": cloud_bg,
    "09d": drizzle_bg,
    "09n": drizzle_bg,
    "10d": rain_bg,
    "10n": rain_bg,
    "13d": snow_bg,
    "13n": snow_bg,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      const bgImage = backgroundImages[data.weather[0].icon] || clear_bg;

      setWeatherData({
        humidity: data.main.humidity,
        WindSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      setBackgroundImage(bgImage); // Update background image
    } catch (error) {
      setWeatherData(false);
      console.error("Error in Fatching WeatherData ");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = inputRef.current.value;
    search(query);
  };

  //   useEffect(() => {
  //     search("");
  //   }, []);

  return (
    <div
      className="flex w-full items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set background image dynamically
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="weather w-[600px]  p-10 rounded-xl bg-black bg-opacity-20  flex flex-col items-center justify-center ">
        <form
          className="search-bar flex items-center w-full"
          onSubmit={handleSubmit}
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="rounded-3xl w-full"
            required
          />
          <button type="submit">
            <Search
              className="rounded-3x cursor-pointer"
              onClick={() => search(inputRef.current.value)}
            />
          </button>
        </form>
        {weatherData ? (
          <>
            <img
              src={weatherData.icon}
              alt="Weather_icon"
              className="weather-icon w-[150px] mx-[30px]"
            />
            <p className=" text-white text-[80px] leading-none">
              {weatherData.temperature}°c
            </p>
            <p className=" text-[40px] text-white leading-none">
              {weatherData.location}
            </p>

            <div className="weather-data w-full mt-10 text-white flex justify-between gap-4">
              <div className="col ">
                <img src={humidity_icon} alt="humidity_icon" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="wind_icon" />
                <div>
                  <p>{weatherData.WindSpeed}km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Weather;
