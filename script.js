const apiKey = '5c81da4b7c1b4ec01d167fbaae27e2e1'; // Replace with your OpenWeather API key
const weatherCard = document.getElementById("weatherCard");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        // Fetch weather data
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            alert("City not found!");
            return;
        }

        // Fetch time data
        const timezoneOffset = weatherData.timezone;
        const localTime = new Date(
            new Date().getTime() + timezoneOffset * 1000
        ).toUTCString().slice(17, 22);

        // Update weather card
        document.getElementById("cityName").textContent = weatherData.name;
        document.getElementById("weatherDescription").textContent =
            weatherData.weather[0].description;
        document.getElementById("temperature").textContent =
            `Temperature: ${weatherData.main.temp}°C`;
        document.getElementById("localTime").textContent = `Local Time: ${localTime}`;
        document.getElementById("weatherIcon").src =
            `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        // Show weather card
        weatherCard.classList.remove("hidden");
        weatherCard.classList.add("visible");
    } catch (error) {
        alert("Error fetching weather data. Please try again later.");
        console.error(error);
    }
});



