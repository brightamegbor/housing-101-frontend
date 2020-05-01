import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import history from './services/history';
// import Routes from './routes';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import $ from 'jquery';
// import { render } from 'react-dom';
import LogIn from './pages/login/login';
import Home from './pages/home/home';
import Register from './pages/signup/signup';



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: localStorage["appState"].isLoggedIn,
      user: localStorage["appState"].user
    };
  }

  _loginUser = (email, password) => {
    $("#login-form button")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://localhost:8000/api/user/login/", formData)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          alert("Login Successful!");

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
            auth_token: json.data.data.auth_token,
            timestamp: new Date().toString()
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          // save app state with user date in local storage
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });
        } else alert("Login Failed!");

        $("#login-form button")
          .removeAttr("disabled")
          .html("Login");
      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
        $("#login-form button")
          .removeAttr("disabled")
          .html("Login");
      });
  };

  

_registerUser = (name, email, password) => {
  $("#email-login-btn")
    .attr("disabled", "disabled")
    .html(
      '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
    );

  var formData = new FormData(); 
  formData.append("password", password);
  formData.append("email", email);
  formData.append("name", name);

  axios
    .post("http://localhost:8000/api/user/register", formData)
    .then(response => {
      console.log(response);
      return response;
    })
    .then(json => {
      if (json.data.success) {
        alert(`Registration Successful!`);

        let userData = {
          name: json.data.data.name,
          id: json.data.data.id,
          email: json.data.data.email,
          auth_token: json.data.data.auth_token,
          timestamp: new Date().toString()
        };
        let appState = {
          isLoggedIn: true,
          user: userData
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isLoggedIn: appState.isLoggedIn,
          user: appState.user
        });
      } else {
        alert(`Registration Failed!`);
        $("#email-login-btn")
          .removeAttr("disabled")
          .html("Register");
      }
    })
    .catch(error => {
      alert("An Error Occured!" + error);
      console.log(`${formData} ${error}`);
      $("#email-login-btn")
        .removeAttr("disabled")
        .html("Register");
    });
};

_logoutUser = () => {
  let appState = {
    isLoggedIn: false,
    user: {}
  };
  // save app state with user date in local storage
  localStorage["appState"] = JSON.stringify(appState);
  this.setState(appState);
};


  componentDidMount() {
    let state = localStorage["appState"];

    if (state) {
      let AppState = JSON.parse(state);
      console.log(AppState);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState});

      if(true) {
        window.location = "/dashboard";
      }
    }
  }

  render() {
    console.log(this.state.isLoggedIn);
    // console.log("path name: " + this.props.location.pathname);

    // if (
    //   !this.state.isLoggedIn &&
    //   this.props.location.pathname !== "/login" &&
    //   this.props.location.pathname !== "/register"
    // ) {
    //   console.log(
    //     "you are not loggedin and are not visiting..."
    //   );
    //   this.props.history.push("/login");
    // }
    // if (
    //   this.state.isLoggedIn &&
    //   (this.props.location.pathname === "/login" ||
    //   this.props.location.pathname === "/register")
    // ) {
    //   console.log(
    //     "you are already logged in"
    //   );
    //   this.props.history.push("/");
    // }

    return (
      <Router history={history}>
        <nav className="navbar fixed-top navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Housing</a>

          <div className="dropleft">
            <button 
            type="button" 
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            className="navbar-toggler mr-3"
            id="navbarDropdown">
              <span
              className="navbar-toggler-icon" 
              ></span>
            </button>

            <div className="dropdown-menu shadow" aria-labelledby="navbarDropdown">
            
              <li className="dropdown-item">
                <a href="/register">SignUp</a>
              </li>
              <li className="dropdown-item">
                <a href="/login">Login</a>
              </li>
            
          </div>
          </div>
          
        </nav>

        <Switch data="data">
        <div id="main">
            <Route path="/" exact 
            render={props => (
                <Home
                    {...props}
                    logoutUser={this._logoutUser}
                    user={this.state.user}
                />
            )}
            />

            <Route 
            path="/register"
            render={props => (
            <Register {...props} registerUser={this._registerUser} />
            )}
            />

            <Route 
            path="/login"
            render={props => <LogIn {...props} loginUser={this._loginUser} />}
            />
          </div>
        </Switch>


        <div className="container mt-5 mb-5 pt-5 footer">

          <div className="">
            <a className="mr-3" href="/#">
              <i className="fab fa-facebook"></i>
            </a>
            <a className="mr-3" href="/#">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="mr-3 youtube-icon" href="/#">
              <i className="fab fa-youtube"></i>
            </a>
            <a className="mr-3" href="/#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          <div className="">
            Copyright &copy;2020 . Housing . All rights reserved
          </div>

          <div className="">
            <a className="mr-1" href="/contact">Contact Support</a>|
            <a className="ml-1 mr-1" href="/terms">Terms</a>|
            <a className="ml-1 mr-1" href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </Router>
    );
  }
}

const AppContainer = withRouter(props => <App {...props} />);

export default AppContainer;
