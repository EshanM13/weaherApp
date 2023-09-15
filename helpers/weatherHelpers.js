const locationUrl = (req) => {
    const apiKey = process.env.API_KEY;
    const cityName = req.query.city;
    const country = req.query?.country
    if(!country){
        return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}` ;
    }
    else {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}${country}&limit=5&appid=${apiKey}` ;
    }
};

const byCordinatesUrl = (cordinates) =>{
    const apiKey = process.env.API_KEY;
    const lon = Number(cordinates.longitude).toFixed(2);
    const lat = Number(cordinates.lattitude).toFixed(2);
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
}

const formatData = (data) =>{
    const celsiusTemp = celsiusData(data.main);
    const fahrenheitTemp = fahrenheitData(data.main);
    const formattedData = {
        weather: data.weather,
        tempInKelvin: data.main,
        tempInCelsius: celsiusTemp,
        tempInFahrenheit: fahrenheitTemp
    }
    return formattedData;
}

const celsiusData = (data) =>{
    const celsiusTemp = {
        temp: convertToCelsius(data.temp),
        feels_like: convertToCelsius(data.feels_like),
        temp_min: convertToCelsius(data.temp_min),
        temp_max: convertToCelsius(data.temp_max),
        pressure: data.pressure,
        humidity: data.humidity
    };
    return celsiusTemp
}

const fahrenheitData = (data) =>{
    const fahrenheitTemp = {
        temp: convertToFahrenheit(data.temp),
        feels_like: convertToFahrenheit(data.feels_like),
        temp_min: convertToFahrenheit(data.temp_min),
        temp_max: convertToFahrenheit(data.temp_max),
        pressure: data.pressure,
        humidity: data.humidity
    };
    return fahrenheitTemp;
}

const convertToCelsius = (kelvin) =>{
    return Number((kelvin - 273.15).toFixed(2)); 
};

const convertToFahrenheit = (kelvin) =>{
    return Number(((kelvin - 273.15) * (9/5) + 32).toFixed(2));
}

module.exports = { locationUrl, byCordinatesUrl , formatData };



