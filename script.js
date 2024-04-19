
//Accessing the rest countries API data by fetch method
fetch("https://restcountries.com/v3.1/all")
.then(res => res.json())
.then(data =>{
// console.log(data);
let restCountries = [];
for(let i=0;i<data.length;i++){
    if(data[i].capital == undefined){
         data[i].capital = {0:`${data[i].name.common}`};
    }
   let countryObj = {
    countryName : data[i].name.common,
    countryFlag : data[i].flags.svg,
    countryNativeName : data[i].name.official,
    countryCapital : data[i].capital[0],
    countryRegion : data[i].region,
    countryPopulation : data[i].population,
    countryCode : data[i].cca3
   };
   restCountries.push(countryObj);
}
// console.log(restCountries);
return restCountries;
})
.then(data =>{
//creating row and col as per country count

let countryCount = data.length;
// console.log(countryCount);

let model = document.createElement("div");
model.setAttribute('class', 'modal fade');
model.setAttribute('id', 'weatherModal');
model.setAttribute('tabindex', '-1');
model.setAttribute('aria-labelledby', 'weatherModelTitle');
model.setAttribute('aria-hidden', 'true');
model.style.display = "none";

let modelDialog = document.createElement("div");
modelDialog.setAttribute('class', 'modal-dialog modal-dialog-centered');

let modelContent = document.createElement("div");
modelContent.setAttribute('class', 'modal-content bg-info');

let modelHeader = document.createElement("div");
modelHeader.setAttribute('class', 'modal-header position-relative');

let modelTitle = document.createElement("h5");
modelTitle.setAttribute('class', 'modal-title col-12 text-center');
modelTitle.setAttribute('id', 'weatherModelTitle');

let modelCloseButton = document.createElement("button");
modelCloseButton.setAttribute('type', 'button');
modelCloseButton.setAttribute('class', 'btn-close position-absolute');
modelCloseButton.setAttribute('data-bs-dismiss', 'modal');
modelCloseButton.setAttribute('aria-label', 'Close');

let modelBody = document.createElement("div");
modelBody.setAttribute('class', 'modal-body text-center');

let modelPara = document.createElement("p");

modelBody.appendChild(modelPara);
modelHeader.append(modelTitle, modelCloseButton);
modelContent.append(modelHeader, modelBody);
modelDialog.appendChild(modelContent);
model.appendChild(modelDialog);

const container = document.createElement("div");
container.setAttribute('class', 'container');

const heading1 = document.createElement("h1");
heading1.setAttribute('class', 'text-center');
heading1.setAttribute('id', 'title');
heading1.innerText = "Rest Countries";

const row = document.createElement("div");
row.setAttribute('class', 'row');

for(let i=0;i<countryCount;i++){
    let col = document.createElement("div");
    col.setAttribute('class', 'col-sm-6 col-md-4 col-lg-4 col-xl-4 col-div');

    let card = document.createElement("div");
    card.setAttribute('class', 'card h-100');
    card.setAttribute('id', data[i].countryName);

    let cardHeader = document.createElement("div");
    cardHeader.setAttribute('class', 'card-header');

    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute('class', 'card-title w-100 text-center py-3 bg-dark text-white m-0');
    cardTitle.innerText = data[i].countryName;

    let cardBody = document.createElement("div");
    cardBody.setAttribute('class', 'card-body d-flex flex-column justify-content-center align-items-center text-center');

    let cardImg = document.createElement("img");
    cardImg.setAttribute('class', 'card-img-top mb-3');
    cardImg.setAttribute('alt', `${data[i].countryName} flag`);
    cardImg.setAttribute('src', `${data[i].countryFlag}`);

    let countryDetailsDiv = document.createElement("div");
    countryDetailsDiv.setAttribute('class', 'card-text');

    countryDetailsDiv.innerHTML = `
                <p>Native Name : ${data[i].countryNativeName}</p>
                <p>Region : ${data[i].countryRegion}</p>
                <p>Capital : ${data[i].countryCapital}</p>
                <p>Population : ${data[i].countryPopulation}</p>
                <p>Country Code : ${data[i].countryCode}</p>
            `;
    let button = document.createElement("a");
    button.setAttribute('class', 'btn btn-primary text-white my-3');
    button.setAttribute('href', `#${data[i].countryName}`);
    button.setAttribute('onClick', `press('${data[i].countryName}', '${data[i].countryCapital}', '${data[i].countryCode}')`);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#weatherModal');
    button.innerText = `Click for Weather`;

    // countryDetailsDiv.append(p1, p2, p3, p4, p5);
    cardBody.append(cardImg, countryDetailsDiv, button);
    cardHeader.appendChild(cardTitle);
    card.append(cardHeader, cardBody);
    col.appendChild(card);
    row.appendChild(col);
}

container.append(heading1 ,row);
document.body.append(model, container);

})
.catch(error => console.log(error))


//while pressing the click weather button, getting the weather by fetch method
let press = (country, city, countryCode)=>{
        const apiKey = "0676b5b2685b23ccfdfb180b90545698";
        let mod = document.getElementById("weatherModal");
        mod.removeAttribute("aria-hidden");
        mod.setAttribute("class", "modal fade show");
        mod.setAttribute("aria-modal", "true");
        mod.setAttribute("role", "dialog");
        mod.style.display = "block";

    let url = "";
    if(countryCode == 'HMD'){
        url = `https://api.openweathermap.org/data/2.5/weather?lat=-53.1067&lon=73.5139&appid=${apiKey}`;
    }else if(countryCode == 'BVT'){
        url = `https://api.openweathermap.org/data/2.5/weather?lat=-54.4232&lon=3.4139&appid=${apiKey}`;
    }else{
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`;
    }
    fetch(url)
    .then(res => res.json())
    .then(data =>{

        let tempKelvin = data.main.temp;
        let tempCelsius = (tempKelvin - 273.15).toFixed(1);

            let weatherObj = {
            weather : data.weather[0].main,
            weatherDescription : data.weather[0].description,
            weatherIcon : data.weather[0].icon,
            temperature : tempCelsius,
            airPressure : data.main.pressure,
            humidity : data.main.humidity,
            windSpeed : data.wind.speed,
            windDirection : data.wind.deg
        };
        // alert(weatherObj);
        return weatherObj;
        
    })
    .then(data =>{
        let weatherObj = data;
        document.getElementById('weatherModelTitle').innerText = `Weather in ${country}`;
            let modalContent = document.querySelector('.modal-body');
            modalContent.innerHTML = `
                <img src="http://openweathermap.org/img/w/${weatherObj.weatherIcon}.png" alt="Weather Icon" class="img-fluid">
                <p>Weather: ${weatherObj.weather}</p>
                <p>Description: ${weatherObj.weatherDescription}</p>
                <p>Temperature: ${weatherObj.temperature}°C</p>
                <p>Air Pressure: ${weatherObj.airPressure} hPa</p>
                <p>Humidity: ${weatherObj.humidity}%</p>
                <p>Wind Speed: ${weatherObj.windSpeed} m/s</p>
                <p>Wind Direction: ${weatherObj.windDirection}°</p>
            `;
    })
    .catch(error => console.log(error))
}