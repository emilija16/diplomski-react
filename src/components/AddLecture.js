import React, { Component } from "react";
import "./css/AddLecture.css";
import AdminService from "../services/admin.service";

export default class AddLecture extends Component {
  constructor(props) {
    super(props);
    this.retrieveTeachers = this.retrieveTeachers.bind(this);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.retrieveRoles = this.retrieveRoles.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.saveLecture = this.saveLecture.bind(this);

    this.state = {
      teachers: [],
      courses: [],
      roles: [],
      lecture: {
        id: 0,
        teacherId: "",
        courseId: "",
        roleId: 0,
      },
    };
  }

  retrieveTeachers() {
    AdminService.getTeachers()
      .then((response) => {
        this.setState({
          teachers: response.data,
        });

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveCourses() {
    AdminService.getCourses()
      .then((response) => {
        this.setState({
          courses: response.data,
        });

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveRoles() {
    AdminService.getRoles()
      .then((response) => {
        this.setState({
          roles: response.data,
        });

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveTeachers();
    this.retrieveCourses();
    this.retrieveRoles();
  }

  saveLecture() {
    let lectureData = {
      teacherId: this.state.lecture.teacherId,
      courseId: this.state.lecture.courseId,
      roleId: this.state.lecture.roleId,
    };

    AdminService.createLecture(lectureData)
      .then((response) => {
        this.setState({
          lecture: response.lectureData,
        });
        this.props.history.push("/admin-lectures");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeTeacher(e) {
    const teacher = e.target.value;
    console.log(teacher);
    this.setState(function (prevState) {
      return {
        lecture: {
          ...prevState.lecture,
          teacherId: teacher,
        },
      };
    });
  }

  onChangeCourse(e) {
    const course = e.target.value;
    console.log(course);
    this.setState(function (prevState) {
      return {
        lecture: {
          ...prevState.lecture,
          courseId: course,
        },
      };
    });
  }

  onChangeRole(e) {
    const role = e.target.value;
    console.log(role);
    this.setState(function (prevState) {
      return {
        lecture: {
          ...prevState.lecture,
          roleId: role,
        },
      };
    });
  }

  render() {
    return (
      <div className="container">
        <div className="add-lecture">
          <h3>Add new Lecture</h3>
          <form>
            <div className="form-group">
              <label>Select Teacher</label>
              <select className="form-control" onChange={this.onChangeTeacher}>
                {this.state.teachers.map((teacher, index) => (
                  <option key={index} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select course</label>
              <select className="form-control" onChange={this.onChangeCourse}>
                {this.state.courses.map((course, index) => (
                  <option key={index} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select Role</label>
              <select className="form-control" onChange={this.onChangeRole}>
                {this.state.roles.map((role, index) => (
                  <option key={index} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <button
            type="button"
            id="add"
            className="btn-add"
            onClick={this.saveLecture}
          >
            {" "}
            Save
          </button>
        </div>
      </div>
    );
  }
}
