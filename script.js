

let weather = {
    api_key: 'your_openweather_apiKey', // Replace with your OpenWeatherMap API key
    unsplash_api_key: 'your_unsplash_apiKey', // Replace with your Unsplash API key

    // function to fetch weather data from OpenWeatherMap API
    fetchWeather: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.api_key}`
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather details found");
                    throw new Error("No weather found");
                }
                return response.json();
            })
            .then((data) => {
                this.displayWeather(data);
                this.fetchCityImage(city); // Fetch image for the city
            })
            .catch((error) => console.log("Error fetching weather:", error));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = `Weather in ${name}`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        
        // document.querySelector(".icon").alt = description; // Set alt text for accessibility
        document.querySelector(".temp").innerHTML = `${temp}&deg;C`;
        document.querySelector(".description").innerHTML = `${description}`;
        document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerHTML = `Wind Speed: ${speed} km/hr`;

        document.querySelector(".weather").classList.remove("loading");
    },

    // function to fetch city image from Unsplash API
    fetchCityImage: function (city) {
        fetch(`https://api.unsplash.com/photos/random?query=${city}&client_id=${this.unsplash_api_key}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.urls && data.urls.full) {
                    document.body.style.backgroundImage = `url('${data.urls.full}')`;
                    document.body.style.backgroundSize = "cover";
                    document.body.style.backgroundPosition = "center";
                    document.body.style.transition = "background 0.5s ease-in-out";
                }
            })
            .catch((error) => console.log("Error fetching city image:", error));
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search-btn").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

window.onload = function () {
    weather.fetchWeather("London"); // Default city
};
