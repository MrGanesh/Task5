
var request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.eu/rest/v2/all', 'true');

request.send();
request.onload = function () {
    var countryData = JSON.parse(this.response);
    var latlong = countryData.map(x => x.latlng);
    var lat = latlong.map(x => x[0]);
    var long = latlong.map(y => y[1]);

    latlong.forEach(element => {
        var data = getWeatherData(element[0], element[1]);
        console.log(data);
    });
}

function getWeatherData(lat, long) {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=f69dce3cb6f7aaac813292631ba45983', true);
    req.send();

    req.onload = function () {
        try {
            var temperature = JSON.parse(this.response);
            // console.log(temperature);
            var mainData = temperature;
            var tempData = temperature.main;
            console.log(mainData.name + " " + tempData.temp);
            return tempData.temp;
        }
        catch (err) {
            console.log('Error Occured: ' + err.message);
        }

    }

}


