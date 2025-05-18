/** @format */
import { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosSunny } from "react-icons/io";
import { MdOutlineWaves } from "react-icons/md";
import { PiWindLight } from "react-icons/pi";
import { FaCloudSunRain } from "react-icons/fa";
import { BsFillCloudDrizzleFill } from "react-icons/bs";
import { BsFillCloudRainHeavyFill } from "react-icons/bs";
import { IoSnow } from "react-icons/io5";
const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const allIcons = {
    "01d": IoIosSunny,
    "01n": IoIosSunny,
    "02d": FaCloudSunRain,
    "02n": FaCloudSunRain,
    "03d": FaCloudSunRain,
    "03n": FaCloudSunRain,
    "04d": BsFillCloudDrizzleFill,
    "04n": BsFillCloudDrizzleFill,
    "09d": BsFillCloudRainHeavyFill,
    "09n": BsFillCloudRainHeavyFill,
    "10d": BsFillCloudRainHeavyFill,
    "10n": BsFillCloudRainHeavyFill,
    "13d": IoSnow,
    "13n": IoSnow,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || IoIosSunny;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    search("New York");
  }, []);
  return (
    <>
      <div className="main_container">
        <div className="search_bar">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search for a city..."
          />
          <button onClick={() => search(inputRef.current.value)}>
            <CiSearch />
          </button>
        </div>
        {weatherData ? (
          <>
            <div className="weather_logo">
              {weatherData.icon && <weatherData.icon />}
            </div>
            <p className="temp">{weatherData.temperature}°c</p>
            <p className="city">{weatherData.location}</p>
            <div className="weather_data">
              <div className="col">
                <MdOutlineWaves />
                <div>
                  <p>91 %</p>
                  <span>{weatherData.humidity}</span>
                </div>
              </div>
              <div className="col">
                <PiWindLight />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Weather;
