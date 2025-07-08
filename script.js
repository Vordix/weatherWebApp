//api aufruf für eine Wettervorhersage
const apiKey = "7192874cc244d413b77103cc3b6cdf90";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

document.addEventListener('DOMContentLoaded', function() {
  makeWeatherApp();
});

function makeWeatherApp(){

  // Event listener for input change
  //document.getElementById("stadtEingabe").addEventListener("change", function() {
  if (document.getElementById("stadtEingabe").value === "" || document.getElementById("stadtEingabe").value === null) {
    console.log("No input provided, defaulting to Berlin");
    document.getElementById("stadtEingabe").value = "Berlin"; // Default to Berlin if no input
  }else{
      const city = document.getElementById("stadtEingabe").value; // Default to Berlin if no input
    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();

      })
      .then(data => {
        console.log(data);
        let tempDegree = Math.round(data.main.temp);
        document.getElementById("gradAnzeige").innerHTML = `${tempDegree}°C`;
        document.getElementById("stadtAnzeige").innerHTML = data.name;
        document.getElementById("minDegrees").innerHTML = `zwischen ${Math.round(data.main.temp_min)}°C`;
        document.getElementById("maxDegrees").innerHTML = `und ${Math.round(data.main.temp_max)}°C`;
        document.getElementById("bewoelkungBeschreibung").innerHTML = `${data.weather[0].description}`;
        let sunrise_timestamp = data.sys.sunrise; // Unix timestamp for sunrise
        let sunset_timestamp = data.sys.sunset; // Unix timestamp for sunset
        document.getElementById("sonnenAuf").innerHTML = `Sonnenaufgang: ${timestampToTime(sunrise_timestamp)}`;
        document.getElementById("sonnenAb").innerHTML = `Sonnenuntergang: ${timestampToTime(sunset_timestamp)}`;
        let datum = new Date(data.dt * 1000);
        document.getElementById("tagAnzeige").innerHTML = `Datum: ${datum.toLocaleDateString()}`;
      })

      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      }
    );
  }
}

  function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
  }
