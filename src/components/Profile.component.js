import React, { Component } from "react";
import AuthService from "../services/AuthService";
import TeacherService from "../services/TeacherService";
import "./css/Profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      teacherAccount: {
        id: null,
        firstName: "",
        lastName: "",
      },
      userAccount: {
        id: null,
        username: "",
        password: "",
      },
      message: "",
    };
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.getTeacherAccountFromService();
    this.getUserAccountFromService();
  }

  onChangeFirstName(e) {
    const firstName = e.target.value;
    console.log(firstName);

    this.setState(function (prevState) {
      return {
        teacherAccount: {
          ...prevState.teacherAccount,
          firstName: firstName,
        },
      };
    });
  }

  onChangeLastName(e) {
    const lastName = e.target.value;
    console.log(lastName);

    this.setState(function (prevState) {
      return {
        teacherAccount: {
          ...prevState.teacherAccount,
          lastName: lastName,
        },
      };
    });
  }
  onChangeUsername(e) {
    const username = e.target.value;
    console.log(username);

    this.setState(function (prevState) {
      return {
        userAccount: {
          ...prevState.userAccount,
          username: username,
        },
      };
    });
  }

  onChangePassword(e) {
    const password = e.target.value;
    console.log(password);

    this.setState(function (prevState) {
      return {
        userAccount: {
          ...prevState.userAccount,
          password: password,
        },
      };
    });
  }

  getTeacherAccountFromService() {
    TeacherService.getTeacherAccount()
      .then((response) => {
        this.setState({
          teacherAccount: response.data,
        });

        console.log(this.state.teacherAccount);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getUserAccountFromService() {
    TeacherService.getUserAccount()
      .then((response) => {
        this.setState({
          userAccount: response.data,
        });

        console.log(this.state.userAccount);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  save() {
    console.log(this.state.teacherAccount);
    TeacherService.editTeacherProfile(this.state.teacherAccount)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The teacher was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const teacher = this.state.teacherAccount;
    const user = this.state.userAccount;
    console.log(user);
    return (
      <div>
        <div className="editForm">
          <h4 className="text-center">My Profile</h4>
          <form>
            <div className="form-group col-md-12">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="name"
                value={teacher.firstName}
                onChange={this.onChangeFirstName}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Surname</label>
              <input
                type="surname"
                className="form-control"
                name="lastName"
                id="surname"
                value={teacher.lastName}
                onChange={this.onChangeLastName}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Username</label>
              <input
                type="username"
                className="form-control"
                name="username"
                id="username"
                value={user.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={this.onChangePassword}
              />
            </div>
          </form>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          id="save"
          onClick={this.save}
        >
          Save
        </button>
      </div>
    );
  }
}
