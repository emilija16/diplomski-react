import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
import EventBus from "./common/EventBus";
import TeacherLectures from "./components/teacher-lectures.component";
import AddLecture from "./components/add-lecture";
import AdminLectures from "./components/admin-lectures.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showTeacherLectures: false,
      adminLectures: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showTeacherLectures: user.scopes.includes("ROLE_TEACHER"),
        adminLectures: user.scopes.includes("ROLE_ADMIN"),
      });
    }
    console.log(user.scopes);

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showTeacherLectures: false,
      adminLectures: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showTeacherLectures, adminLectures } = this.state;
    console.log(showTeacherLectures);

    return (
      <div>
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            {showTeacherLectures && (
              <li className="nav-item">
                <Link to={"/lectures"} className="nav-link">
                  Lectures
                </Link>
              </li>
            )}

            {adminLectures && (
              <li className="nav-item">
                <Link to={"/admin-lectures"} className="nav-link">
                  Lectures
                </Link>
              </li>
            )}

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    My profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/lectures" component={TeacherLectures} />
            <Route path="/add-lecture" component={AddLecture} />
            <Route path="/admin-lectures" component={AdminLectures} />
          </Switch>
        </div>
        {/* <AuthVerify logOut={this.logOut} /> */}
      </div>
    );
  }
}

export default App;
