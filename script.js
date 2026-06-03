const apiKey = "YOUR_API_KEY";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const weatherCard = document.getElementById("weatherCard");

    if (city === "") {
        errorMsg.textContent = "Please enter a city name";
        weatherCard.style.display = "none";
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
        if (data.cod == 401) {
        errorMsg.textContent = "Invalid API key. Please add a valid OpenWeatherMap API key.";
    } else {
        errorMsg.textContent = "City not found";
    }
    weatherCard.style.display = "none";
    return;
}

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;

        errorMsg.textContent = "";
        weatherCard.style.display = "block";
    } catch (error) {
        errorMsg.textContent = "Something went wrong. Please try again.";
        weatherCard.style.display = "none";
    }
}