//API-KEY fb6dde7ff354665a171b5be61cee9fc3

// Variaveis e seleção de elementos html
const apiKey = "fb6dde7ff354665a171b5be61cee9fc3";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data")

const suggestionButtons = document.querySelectorAll("#suggestions button");
const suggestionContainer = document.querySelector("#suggestions");

const errorMessageContainer = document.querySelector("#error-message");

// Funções

const getWeatherData = async(city) => {
    const apiWeatherURL =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data =await res.json()

    console.log(data)

    return data;
}

// Loader

const toggleLoader = () => {
    loader.classList.toggle("hide");
  };

const showWeatherData = async (city) => {

    hideInformation();

    const data = await getWeatherData(city);

    if(data.cod === "404") {
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src", 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    // Change bg image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;


    weatherContainer.classList.remove("hide");


}



// Eventos

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
    
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value; 

        showWeatherData(city);
    }
});

//  Tratamento de erros

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
  };

  
const hideInformation = () => {
    
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
  };


// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });