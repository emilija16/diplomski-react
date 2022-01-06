import React, { Component } from "react";
import TeacherService from "../services/teacher.service";
import "./css/AdminLectures.css";

export default class AdminLectures extends Component {
  constructor(props) {
    super(props);
    this.retrieveLectures = this.retrieveLectures.bind(this);
    this.state = {
      lectures: [],
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
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Teacher</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lectures &&
              this.state.lectures.map((lecture) => (
                <tr key={lecture.id}>
                  <td>{lecture.courseDTO.name}</td>
                  <td>
                    {lecture.teacherDTO.firstName} {lecture.teacherDTO.lastName}
                  </td>
                  <td>{lecture.roleDTO.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          className="btn btn-primary"
          type="button"
          id="add"
          onClick={() => this.props.history.push("/add-lecture")}
        >
          Add New
        </button>
      </div>
    );
  }
}
