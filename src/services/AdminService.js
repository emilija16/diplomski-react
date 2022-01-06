import axios from "axios";
import authHeader from "./auth-header";

const teachers = "http://localhost:8080/teachers";
const courses = "http://localhost:8080/courses";
const lectures = "http://localhost:8080/lectures";

class AdminService {
  getTeachers() {
    return axios.get(teachers, { headers: authHeader() });
  }
  getCourses() {
    return axios.get(courses, { headers: authHeader() });
  }
  getRoles() {
    return axios.get("http://localhost:8080/lectures/roles", {
      headers: authHeader(),
    });
  }

  createLecture(lecture) {
    return axios.post(lectures, lecture, {
      headers: authHeader(),
    });
  }
}

export default new AdminService();
