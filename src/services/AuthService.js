import axios from "axios";
import jwt from "jwt-decode";

const API_URL = "http://localhost:8080/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "authenticate", {
        username,
        password,
      })
      .then((response) => {
        console.log("Received response after login!");
        if (response.data) {
          console.log("Setting local storage data");
          localStorage.setItem("user", JSON.stringify(response.data));
          const userData = jwt(response.data);
          localStorage.setItem("userData", JSON.stringify(userData));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("userData"));
  }
}

export default new AuthService();
