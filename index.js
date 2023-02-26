const apiKey = "b52ef21e8a5d6e23922b6be66f9b9922";
let latt = "";
let long = "";

const locationEl = document.getElementById("input");
const srchBtn = document.getElementById("button");
const popEl = document.getElementById("pop");
const city = document.getElementById("cityOrCountry");
const bgImage = document.getElementById("bg-image");
const temperatureEl = document.getElementById("temperature");
const mainConEl = document.getElementById("main-con");
const feelsLikeEl = document.getElementById("feels-like");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const imgDiv = document.getElementById("img-div");
const errorM = document.getElementById("invalid-location");
const tryAgainButton = document.getElementById("try-again");

srchBtn.addEventListener("click", getWeather);

async function getWeather() {
    if (locationEl.value) {
        
        const coordinates = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationEl.value}&appid=${apiKey}`).then(response => response.json()).catch(error => console.error(error));
        
        if (coordinates.length != 0) {
            errorM.style.display = "none";
            popEl.style.display = "block";

            latt = coordinates[0].lat;
            long = coordinates[0].lon;
            const cityOrCountry = coordinates[0].name;
            city.innerHTML = `<i class="fa-solid fa-location-arrow"> ${cityOrCountry}`;

            const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=${apiKey}&units=metric`).then(response => response.json());
            const mainCon = result.weather[0].main;
            const icon = result.weather[0].icon;
            const temperature = result.main.temp;
            const feelsLike = result.main.feels_like;
            const humidity = result.main.humidity;
            const windSpeed = result.wind.speed;

            bgImage.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
            temperatureEl.innerText = Math.round(temperature) + "°C";
            mainConEl.innerText = mainCon;
            feelsLikeEl.innerText = Math.round(feelsLike) + "°C";
            windEl.innerText = Math.round(windSpeed) + " kph";
            humidityEl.innerText = humidity;

            if (icon[2] == "d") {
                imgDiv.style.backgroundColor = "#79C0EC";
            }
            else {
                imgDiv.style.backgroundColor = "#1B5B93";
            }
        }

        else {
            popEl.style.display = "none";
            errorM.style.display = "block";
        }
    }
}

tryAgainButton.addEventListener("click", function() {
    locationEl.value = "";
    window.location.reload();
});

window.onload = function() {
    locationEl.value = "";
    locationEl.focus();
}
