let weather = 
{
    apiKey: "3b90e0085d0660e288c5533afa4dc609",

    //code for city data
    fetchGeoPositionCity: function(city)
    {
        fetch
        (
            "https://api.openweathermap.org/geo/1.0/direct?q="
            + city
            + "&limit=1&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.checkValidCityAndFetchWeather(data));
    },

    checkValidCityAndFetchWeather: function(data)
    {
        if(data === undefined || data.length == 0)
        {
            document.querySelector(".description").innerText = "Please enter a valid city name or zip code";
            document.querySelector(".city_country").innerText = "";
            document.querySelector(".icon").src = "";
            document.querySelector(".temp").innerText = "";
            document.querySelector(".humidity").innerText = "";
            document.querySelector(".low").innerText = "";
            document.querySelector(".high").innerText = "";
            document.querySelector(".note").innerText = "";
        }
        else
        {
            const {lat, lon} = data[0];
            fetch
            (
                "https://api.openweathermap.org/data/2.5/weather?lat="
                + lat
                + "&lon="
                + lon
                + "&units=imperial&appid="
                + this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        }
    },

    //code for zip data
    fetchGeoPositionZip: function(zip)
    {
        fetch
        (
            "https://api.openweathermap.org/geo/1.0/zip?zip="
            + zip
            + "&limit=1&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.checkValidZipAndFetchWeather(data));
    },

    checkValidZipAndFetchWeather: function(data)
    {
        const {message} = data;
        if(message === "not found" || message === "invalid zip code")
        {
            document.querySelector(".description").innerText = "Please enter a valid city name or zip code";
            document.querySelector(".city_country").innerText = "";
            document.querySelector(".icon").src = "";
            document.querySelector(".temp").innerText = "";
            document.querySelector(".humidity").innerText = "";
            document.querySelector(".low").innerText = "";
            document.querySelector(".high").innerText = "";
            document.querySelector(".note").innerText = "";
        }
        else
        {
            const {lat, lon} = data;
            fetch
            (
                "https://api.openweathermap.org/data/2.5/weather?lat="
                + lat
                + "&lon="
                + lon
                + "&units=imperial&appid="
                + this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        }
    },

    //display weather data 

    displayWeather: function(data)
    {
        //note: name icon description etc are components of data and data.weather
        const {name} = data;
        //note: weather is an array
        const {main, description, icon} = data.weather[0]; 
        const {temp, temp_min, temp_max, humidity} = data.main;
        const {country} = data.sys;
        
        //change text
        document.querySelector(".city_country").innerText = "Weather in " + name + ", " + country;
        document.querySelector(".icon").src = 
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".low").innerText = "Low: " + temp_min + "°F";
        document.querySelector(".high").innerText = "High: " + temp_max + "°F";
        document.querySelector(".note").innerText = "";
        
        //change background
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + "clouds" + "')"

        //Show contents
        document.getElementsByClassName("weather")[0].style.visibility = "visible";
    },

    //search function
    search: function()
    {
        var value = document.querySelector(".search-bar").value;
        if (value.charCodeAt(0) >= 48 && value.charCodeAt(0) <= 57)
        {
            this.fetchGeoPositionZip((document.querySelector(".search-bar").value).replace(/ /g, ""));
        }
        else
        {
            this.fetchGeoPositionCity(document.querySelector(".search-bar").value);
        }
    },
};

//click search button
document
.querySelector(".search button")
.addEventListener("click", function () 
{
    weather.search();
});

//press enter
document
.querySelector(".search-bar")
.addEventListener("keyup", function(event)
{
    if (event.key == "Enter")
    {
        weather.search();
    }
});
