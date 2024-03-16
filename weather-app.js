function loadWeatherData(cityName) {
    if (cityName === '') {
        cityName = document.getElementById('city-name').value;
        if (cityName === '') {
            alert('Please enter city name');
            return;
        }
        document.getElementById('city-name').value = '';
    }

    const apiKey = "ed552017313de1c18319aa3fdabf7dfc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&;`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            // console.log(data);
            const temp = data.main.temp - 273.15;
            // console.log(temp);
            document.getElementById("temperature").innerHTML = `${temp.toFixed(2)}°C`;
            const feelLike = data.main.feels_like - 273.15;
            // console.log(feelLike);
            document.getElementById("feels-like").innerHTML = `${feelLike.toFixed(2)}°C`;
            document.getElementById("pressure").innerHTML = `${data.main.pressure} hPa`;
            document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
            document.getElementById("visibility").innerHTML = `${data.visibility} m`;

            document.getElementsByClassName("temp")[0].innerHTML = `${temp.toFixed(2)}°C`;
            document.getElementsByClassName("name")[0].innerHTML = `${data.name}, ${data.sys.country}`;

            const timezoneOffset = data.timezone / 60;

            const cityDate = new Date(Date.now() + timezoneOffset * 60000);
            document.getElementsByClassName("time")[0].innerHTML = cityDate.toLocaleTimeString();
            document.getElementsByClassName("date")[0].innerHTML = cityDate.toDateString();
        } 
        else if (xhr.readyState === 4) {
            alert("No City Found.");
        }
    };
    xhr.send();
}

$(document).ready(function() {
    loadWeatherData("Faisalabad");
    $('#city-name').keypress(function(event) {
        if (event.keyCode === 13) {
            loadWeatherData('');
        }
    });
});