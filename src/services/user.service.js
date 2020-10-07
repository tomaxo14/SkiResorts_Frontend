import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const API_URL_BASIC = `http://localhost:8080/`;

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

  yourRatings() {
    return axios.get(API_URL_BASIC + `yourRatings`, { headers: authHeader()});
  }


}

export default new UserService();