import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/currentWeather/currentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const foreCastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, foreCastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const forecastResponse = await res[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.error(err));
  };
  // console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
