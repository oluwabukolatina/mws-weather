const api = {
        key: 'e6117d7f37bd601583b7f2d09c1ff6d2',
        baseUrl: 'https://api.openweathermap.org/data/2.5/onecall?lat=40.712772&lon=-74.006058&&units=metric&appid='
};
const todaysDate = (new Date()).toString().split(' ').splice(1, 3).join(' ');
document.getElementById("todayDate").innerHTML = todaysDate;
const searchButton = document.getElementById('searchBtn');
const displayStored = () => {
  let output = '<div class="result-details">';
  
  JSON.parse(sessionStorage.getItem('store')) !== null ? JSON.parse(sessionStorage.getItem('store')).forEach(data => {
      let image = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      output += `
        <div class="result-preview">
          <img id="result-src" alt="" src="${image}">
          <div class="preview-content">
          <p id="result-temperature">${Math.round(data.temp)}°c</p>
          <p id="result-description">${data.weather[0].description}</p>
          </div>
        </div>
        <div class="result-details-details">
          <div class="detail">
            <p class="detail-heading">Feels Like</p>
            <p id="result-feels" class="detail-item">${Math.round(data.feels_like)}°c</p>
            <i class="fa fa-temperature-high"></i>
            <img src="img/temperature.png" alt="">
          </div>
          <div class="detail">
            <p class="detail-heading">Humidity</p>
            <p id="result-humidity" class="detail-item">${data.humidity}%</p>
            <img src="img/humidity.png" alt="">
          </div>
          <div class="detail">
            <p class="detail-heading">Wind Speed</p>
            <p id="result-wind" class="detail-item">${data.wind_speed}mph</p>
            <i class="fas fa-wind"></i>
            <img src="img/wind.png" alt="">
          </div>
        </div>
      `;
    }) : null;
    output += '</div>';
    document.querySelector('.results').innerHTML = output;
};
const getWeatherResults = () => {
    fetch(`${api.baseUrl}${api.key}`)
        .then(response => response.json())
        .then((data) => {
          displayWeatherResult(data);
          
          const store =
            JSON.parse(sessionStorage.getItem("store")) !== null
              ? JSON.parse(sessionStorage.getItem("store"))
              : [];
          store.unshift(data.current);
          sessionStorage.setItem("store", JSON.stringify(store));
        

            displayStored()

            
        })
};
const onLoad = () => {
  fetch(`${api.baseUrl}${api.key}`)
      .then(response => response.json())
      .then((data) => {
        displayWeatherResult(data);
        
        const store =
          JSON.parse(sessionStorage.getItem("store")) !== null
            ? JSON.parse(sessionStorage.getItem("store"))
            : [];
        store.unshift(data.current);
        sessionStorage.setItem("store", JSON.stringify(store));
      


          
      })
};
searchButton.addEventListener('click', getWeatherResults);
const displayWeatherResult = (params) => {
        let temperature = document.getElementById('temperature');
        temperature.innerHTML = `${Math.round(params.current.temp)}°c`;
        let weatherIcon = document.getElementById("src");
        weatherIcon.src = `http://openweathermap.org/img/wn/${params.current.weather[0].icon}@2x.png`;
        let description = document.getElementById("description");
        description.innerHTML = params.current.weather[0].description;
        let feels = document.getElementById('feels');
        feels.innerHTML = `${Math.round(params.current.feels_like)}°c`;
        let humidity = document.getElementById('humidity');
        humidity.innerHTML = `${params.current.humidity}%`;
        let wind = document.getElementById('wind');
        wind.innerHTML = `${params.current.wind_speed}mph`;
};
