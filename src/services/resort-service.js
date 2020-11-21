import axios from 'axios';

const API_URL = 'http://localhost:8080/';
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather?lat=';
const WEATHER_API_URL_SEVEN_DAYS = 'http://api.openweathermap.org/data/2.5/onecall?lat=';
const WEATHER_API_URL_ENDING = '&units=metric&lang=pl&appid=621d81a28a5e153d8b0c65721e9c78c8';

class ResortService {

    getAllResorts() {
        return axios.get(API_URL + 'resorts');
    }

    getAllResortsWithGeo(latitude, longitude) {
        return axios.get(API_URL + 'resortsWithGeo?latitude=' + latitude + '&longitude=' + longitude);
    }

    getResortById(id) {
        return axios.get(API_URL + 'resortDetails?resortId=' + id);
    }

    getWeather(lat, long) {
        return axios.get(WEATHER_API_URL + lat + '&lon=' + long + WEATHER_API_URL_ENDING);
        
    }

    getWeatherSevenDays(lat, long) {
        return axios.get(WEATHER_API_URL_SEVEN_DAYS + lat + '&lon=' + long + WEATHER_API_URL_ENDING);
    }

    getPreferredResorts(blue, red, black, snowPark, location, userLat, userLon) {
        return axios.get(API_URL + 'preferredResorts?blue=' + blue + '&red=' + red + '&black=' + black + '&snowPark=' +
        snowPark + '&location=' + location + '&userLat=' + userLat + '&userLon=' + userLon);
    }
}

export default new ResortService;