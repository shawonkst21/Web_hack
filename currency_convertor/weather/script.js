const API_KEY = "235b072de2994a8e189b51d2b6c1f2c5";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);

    if (data.cod === 200) {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/default.png"; 
        }
        document.querySelector(".weather").style.display="block";
    } else {
        alert("City not found!");
    }
}

searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});
