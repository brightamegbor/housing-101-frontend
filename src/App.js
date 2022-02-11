import React, { Component, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter } from 'react-router-dom';
// import history from './services/history';
// import Routes from './routes';
// import '@fortawesome/fontawesome-free/css/all.css';
// import axios from 'axios';
// import $ from 'jquery';
// import { render } from 'react-dom';
// import LogIn from './pages/login/login';
// import Home from './pages/home/home';
// import Register from './pages/signup/signup';
// import { withRouter } from './components/withRouter'
import { LandingNav } from './components/landing_nav';
import { LandingFooter } from './components/landing_footer';
import AllRoutes from './routes';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     isLoggedIn: localStorage["appState"].isLoggedIn,
  //     user: localStorage["appState"].user
  //   };
  // }

  // _loginUser = (email, password) => {
  //   $("#login-form button")
  //     .attr("disabled", "disabled")
  //     .html(
  //       '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
  //     );
  //   var formData = new FormData();
  //   formData.append("email", email);
  //   formData.append("password", password);

  //   axios
  //     .post("http://localhost:8000/api/user/login/", formData)
  //     .then(response => {
  //       console.log(response);
  //       return response;
  //     })
  //     .then(json => {
  //       if (json.data.success) {
  //         alert("Login Successful!");

  //         let userData = {
  //           name: json.data.data.name,
  //           id: json.data.data.id,
  //           email: json.data.data.email,
  //           auth_token: json.data.data.auth_token,
  //           timestamp: new Date().toString()
  //         };
  //         let appState = {
  //           isLoggedIn: true,
  //           user: userData
  //         };
  //         // save app state with user date in local storage
  //         localStorage["appState"] = JSON.stringify(appState);
  //         this.setState({
  //           isLoggedIn: appState.isLoggedIn,
  //           user: appState.user
  //         });
  //       } else alert("Login Failed!");

  //       $("#login-form button")
  //         .removeAttr("disabled")
  //         .html("Login");
  //     })
  //     .catch(error => {
  //       alert(`An Error Occured! ${error}`);
  //       $("#login-form button")
  //         .removeAttr("disabled")
  //         .html("Login");
  //     });
  // };

  

// _registerUser = (name, email, password) => {
//   $("#email-login-btn")
//     .attr("disabled", "disabled")
//     .html(
//       '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
//     );

//   var formData = new FormData(); 
//   formData.append("password", password);
//   formData.append("email", email);
//   formData.append("name", name);

//   axios
//     .post("http://localhost:8000/api/user/register", formData)
//     .then(response => {
//       console.log(response);
//       return response;
//     })
//     .then(json => {
//       if (json.data.success) {
//         alert(`Registration Successful!`);

//         let userData = {
//           name: json.data.data.name,
//           id: json.data.data.id,
//           email: json.data.data.email,
//           auth_token: json.data.data.auth_token,
//           timestamp: new Date().toString()
//         };
//         let appState = {
//           isLoggedIn: true,
//           user: userData
//         };
//         // save app state with user date in local storage
//         localStorage["appState"] = JSON.stringify(appState);
//         this.setState({
//           isLoggedIn: appState.isLoggedIn,
//           user: appState.user
//         });
//       } else {
//         alert(`Registration Failed!`);
//         $("#email-login-btn")
//           .removeAttr("disabled")
//           .html("Register");
//       }
//     })
//     .catch(error => {
//       alert("An Error Occured!" + error);
//       console.log(`${formData} ${error}`);
//       $("#email-login-btn")
//         .removeAttr("disabled")
//         .html("Register");
//     });
// };

// _logoutUser = () => {
//   let appState = {
//     isLoggedIn: false,
//     user: {}
//   };
//   // save app state with user date in local storage
//   localStorage["appState"] = JSON.stringify(appState);
//   this.setState(appState);
// };


  // useEffect(() => {
  //   let state = localStorage["appState"];

  //   if (state) {
  //     let AppState = JSON.parse(state);
  //     console.log(AppState);
  //     this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState});

  //     if(true) {
  //       window.location = "/dashboard";
  //     }
  //   }
  // });

  // render() {
  //   console.log(this.state.isLoggedIn);
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
        <Provider store={store}>
          <BrowserRouter>
            <LandingNav />
            
            <AllRoutes />

            <LandingFooter />
          </BrowserRouter>
        </Provider>
    )
  // }
}

// const AppContainer = withRouter(props => <App {...props} />);

export default App;
