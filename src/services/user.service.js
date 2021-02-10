import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8080/api/test/';
// const API_URL_BASIC = `http://localhost:8080/`;
const API_URL = 'https://ski-resorts-heroku.herokuapp.com/api/test/';
const API_URL_BASIC = `https://ski-resorts-heroku.herokuapp.com/`;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  async rateResort(resortId, value, message) {

    let options = {
      method: 'POST',
      headers : authHeader()
      };
      let url;
      if(message === undefined) {
        url = API_URL_BASIC + `rateResort?resortId=` + resortId + `&value=` + value;
      } else {
        url = API_URL_BASIC + `rateResort?resortId=` + resortId + `&value=` + value + `&message=` + message;
      }
      fetch(url,options).then(res => console.log(res));
  }

  async addFavourite(resortId) {
    let options = {
      method: 'POST',
      headers : authHeader()
      };
      let url = API_URL_BASIC + `addFavourite?resortId=` + resortId;
      fetch(url,options).then(res => console.log(res));
  }

  async deleteFavourite(resortId) {
    let options = {
      method: 'POST',
      headers : authHeader()
      };
      let url = API_URL_BASIC + `deleteFavourite?resortId=` + resortId;
      fetch(url,options).then(res => console.log(res));
  }

  async saveLocation(latitude, longitude) {
    let options = {
      method: 'POST',
      headers : authHeader()
      };
      let url = API_URL_BASIC + `saveLocation?latitude=` + latitude + `&longitude=` + longitude;
      fetch(url,options).then(res => console.log(res));
  }

  yourRatings() {
    return axios.get(API_URL_BASIC + `yourRatings`, { headers: authHeader()});
  }

  getFavouritesWithGeo(latitude, longitude) {
    return axios.get(API_URL_BASIC + 'favouritesWithGeo?latitude=' + latitude + '&longitude=' + longitude, { headers: authHeader()});
}

  yourFavourites() {
    return axios.get(API_URL_BASIC + `yourFavourites`, { headers: authHeader()});
  }

  yourPreferences() {
    return axios.get(API_URL_BASIC + `yourPreferences`, { headers: authHeader()});
  }

  yourLocation() {
    return axios.get(API_URL_BASIC + `yourLocation`, { headers: authHeader()});
  }

  async addPreferences(blue, red, black, snowPark, location) {
    let options = {
      method: 'POST',
      headers : authHeader()
      };
      let url = API_URL_BASIC + `addPreferences?blue=` + blue + `&red=` + red + `&black=` + black
      + `&snowPark=` + snowPark + `&location=` + location;
      fetch(url,options).then(res => console.log(res));
  }


}

export default new UserService();