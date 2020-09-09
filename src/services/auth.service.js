import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

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
}

export default new AuthService();
