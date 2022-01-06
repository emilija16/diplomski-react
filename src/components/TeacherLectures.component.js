import React, { Component } from "react";
import TeacherService from "../services/teacher.service";
import "./css/TeacherLectures.css";

export default class TeacherLectures extends Component {
  constructor(props) {
    super(props);
    this.retrieveLectures = this.retrieveLectures.bind(this);
    this.deleteLecture = this.deleteLecture.bind(this);
    this.state = {
      lectures: [],
      teacherLectures: [],
    };
  }

  componentDidMount() {
    this.retrieveLectures();
  }

  retrieveLectures() {
    TeacherService.getTeacherLectures()
      .then((response) => {
        this.setState({
          lectures: response.data,
        });

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteLecture(id) {
    TeacherService.deleteLecture(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const user = JSON.parse(localStorage.getItem("userData"));
    for (var key of Object.keys(this.state.lectures)) {
      if (this.state.lectures[key].teacherDTO.id === user.pid) {
        this.state.teacherLectures.push(this.state.lectures[key]);
        console.log(this.state.teacherLectures);
      }
    }
    return (
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.teacherLectures &&
              this.state.teacherLectures.map((lecture) => (
                <tr key={lecture.courseDTO.id}>
                  <td>{lecture.courseDTO.id}</td>
                  <td>{lecture.courseDTO.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteLecture(lecture.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
