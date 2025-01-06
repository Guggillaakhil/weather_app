let valueSearch = document.getElementById("valuesearch");
let city = document.getElementById("city");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let clouds = document.getElementById("clouds");
let pressure = document.getElementById("pressure");
let description = document.getElementById("description");
let form = document.querySelector("form");

let api_key = '706e333eb645c6fd0254fea86cad7f93';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + api_key;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (valueSearch.value !== '') {
        searchweather();
    }
});

const searchweather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                // Update city and country
                city.querySelector('figcaption').innerText = data.name;
                city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/32.png';

                // Update temperature and weather description
                temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
                  cels.innerText = Math.ceil(data.main.temp);
                description.innerText = data.weather[0].description;

                // Update weather details
                clouds.innerText = `Clouds: ${data.clouds.all}%`;
                humidity.innerText = `Humidity: ${data.main.humidity}%`;
                pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
            } else {
                // Handle errors
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
};

const initApp = () => {
    valueSearch.value = 'washington';
    searchweather();
};

initApp();
