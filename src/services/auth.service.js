import axios from "axios";
import jwt_decode from "jwt-decode";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://ski-resorts-heroku.herokuapp.com/api/auth/";

class AuthService {
  login(login, password) {
    return axios
      .post(API_URL + "signin", {
        login,
        password
      })
      .then(response => {
        if (response.data.token) {
          console.log("Wysyłam token !");
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(login, email, name, surname, password) {
    return axios.post(API_URL + "signup", {
      login,
      email,
      name,
      surname,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  checkTokenExpiration() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== undefined && user !== null) {
      let originalToken = user.token;
      let decodedToken = jwt_decode(originalToken);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();
      console.log(currentDate.getTime());

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem("user");
      }
    }
  }

}

export default new AuthService();
