import axios from "axios";
import authHeader from "./AuthHeader";

const teacherConnURL = "http://localhost:8080/teachers/myTeacherAccount";
const userConnURL = "http://localhost:8080/teachers/myUserAccount";
const teachers = "http://localhost:8080/teachers";
const users = "http://localhost:8080/teachers/editUser";
const lectures = "http://localhost:8080/lectures";

class TeacherService {
  getTeacherLectures() {
    return axios.get(lectures, { headers: authHeader() });
  }

  getTeacherAccount() {
    return axios.get(teacherConnURL, { headers: authHeader() });
  }

  getUserAccount() {
    return axios.get(userConnURL, { headers: authHeader() });
  }

  editTeacherProfile(teacher) {
    return axios.put(teachers, teacher, { headers: authHeader() });
  }

  editUserProfile(user) {
    return axios.put(users, user, { headers: authHeader() });
  }

  deleteLecture(id) {
    return axios.delete(`${lectures}/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new TeacherService();
