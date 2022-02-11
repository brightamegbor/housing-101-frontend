import React, {useEffect} from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';
import $ from 'jquery';
import axios from 'axios';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators
} from 'react-reactive-form';
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';

// const LogIn = ({ history, loginUser = f => f }) => {

    

//     let _email, _password;

//       const handleLogin = e => {
//         e.preventDefault();

//         loginUser(
//             _email.value,
//             _password.value
//         );
//     };

//     return (
//         <div>
//              <div className="container mt-5 pt-5 custom-form">
//                 <Card className="form-shadow">
//                     <Card.Body>
//                         <h5 className="text-center mb-5">Log in</h5>

//                         <Form id="login-form" action="" onSubmit={handleLogin} method="post">

//                             <Form.Group>
//                                 <InputGroup>
//                                     <InputGroup.Prepend>
//                                         <InputGroup.Text id="inputGroupPrepend">
//                                             <i className="fas fa-envelope"></i>
//                                         </InputGroup.Text>
//                                     </InputGroup.Prepend>
//                                     <Form.Control 
//                                     type="email" 
//                                     placeholder="Enter email"
//                                     ref={input => (_email = input)}
//                                     id="email"
//                                     name="email" />
//                                 </InputGroup>
//                             </Form.Group>

//                             <Form.Group>
//                                 <InputGroup>
//                                     <InputGroup.Prepend>
//                                         <InputGroup.Text id="inputGroupPrepend">
//                                             <i className="fas fa-lock"></i>
//                                         </InputGroup.Text>
//                                     </InputGroup.Prepend>
//                                 <Form.Control 
//                                 type="password" 
//                                 placeholder="Password"
//                                     id="password"
//                                     ref={input => (_password = input)}
//                                     name="password" />
//                                 </InputGroup>
//                             </Form.Group>

//                             <Form.Group controlId="formBasicCheckbox">
//                                 <Form.Check type="checkbox" label="Remember me" />
//                             </Form.Group>
//                             <Button variant="primary" type="submit"
//                             id="email-login-btn"
//                             href="#facebook">
//                                 Log in
//                             </Button>
//                         </Form>
//                     </Card.Body>
//                 </Card>

//                 <p className="mt-5 separator">or</p>
//                 <div className="text-center">
//                     <p className="mt-3">Log in with</p>

//                     <a href="https://facebook.com">
//                         <i className="fab fa-facebook Soc-icon"></i>
//                     </a>
//                     <a href="https://gmail.com">
//                         <i className="fab fa-google Soc-icon"></i>
//                     </a>
//                     <a href="https://twitter.com">
//                         <i className="fab fa-twitter Soc-icon"></i>
//                     </a>
//                 </div>

//                 <p className="mt-5 separator">o</p>

//                 <p className="text-center">
//                     Don't have an account?
//                     <a className="ml-1" href="/register">Sign up</a>
//                 </p>
//             </div>
//         </div>
//     );
// }


const TextInput = ({ handler, touched, hasError, meta }) => (
    
         <Form.Control
            type={`${meta.name}`} 
            placeholder={`Enter ${meta.label}`}
            {...handler} />
    
)


TextInput.propTypes = {
    handler: PropTypes.any,
    touched: PropTypes.any, 
    hasError: PropTypes.any, 
    meta: PropTypes.any,
};


function LogIn() {
    // constructor(props){
    //     super(props);
    
    //     this.state = {
    //       isLoggedIn: false,
    //       user: {}
    //     };
    //   }
    const { register: login, handleSubmit, watch, formState: { errors } } = useForm();
      

    // loginForm = FormBuilder.group({
    //     email: ["", Validators.required],
    //     password: ["", Validators.required],
    //     // rememberMe: false
    // });

    const _loginUser = (loginFormValue) => {
        // let token;
    
        $("#login-form button")
          .attr("disabled", "disabled")
          .html(
            '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
          );
        
        console.log(loginFormValue);
    
        // axios.defaults.headers.common = {
        //     ...axios.defaults.headers.common,
        //     'Access-Control-Allow-Origin': 'http://localhost:3000',
        //     "Content-Type": ' application/x-www-form-urlencoded',
        //     "Authorization": token ? `Token ${token}` : undefined
        //  };
        //  axios.defaults.preflightContinue = true;
         //axios.defaults.crossDomain = true;
        //  axios.defaults.withCredentials = !!token;
    
        axios
          .post("/login", loginFormValue)
          .then(response => {
            console.log(response);
            return response;
          })
          .then(json => {
            if (json.status === 200) {
              alert("Login Successful!");
    
              let userData = {
                name: json.data.name,
                id: json.data.id,
                email: json.data.email,
                token: json.data.token,
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
    
              window.location = "/dashboard";
            } else alert("Login Failed!");
    
            $("#login-form button")
              .removeAttr("disabled")
              .html("Login");
          })
          .catch(error => {
            alert(`An Error Occured! ${error}`);
            console.log(error);
            $("#login-form button")
              .removeAttr("disabled")
              .html("Login");
          });
      };

    const handleLogin = (e) => {
        // e.preventDefault();

        this._loginUser(e);
        // console.log(this.loginForm.value);
    };

    
    
    useEffect(() => {
        let state = localStorage["appState"];

        if (state) {
        let AppState = JSON.parse(state);
        // console.log(AppState);
        // this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState});

        if(AppState.isLoggedIn) {
          window.location = "/dashboard";
        }
        
        }

        var navbar = document.querySelector("nav");
        navbar.classList.remove("navbar-dark", "bg-dark", "shadow");
        navbar.classList.add("navbar-light", "bg-light", "shadow");

    });

    // render() {

    return (
        <div>
             <div className="container mt-5 pt-5 custom-form">
                <Card className="form-shadow">
                    <Card.Body>
                        <h5 className="text-center mb-5">Log in</h5>

                        
                        <Form id="login-form" onSubmit={handleSubmit(handleLogin)} method="post">

                            <Form.Group className="mb-4">
                                <InputGroup>
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <i className="fas fa-envelope"></i>
                                    </InputGroup.Text>
                                    {/* <FieldControl
                                    {...login("email", {required: true})} */}
                                    <TextInput handler={{...login("email", {required: true})}} meta={{ label: "Email", name: "email" }} />
                                    {/* meta={{ label: "Email", name: "email" }} /> */}
                                </InputGroup>
                            </Form.Group>
                            

                            <Form.Group className="mb-4">
                                <InputGroup>
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <i className="fas fa-lock"></i>
                                    </InputGroup.Text>
                                
                                <TextInput handler={{...login("password", {required: true})}} meta={{ label: "Password", name: "password"  }} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                                {/* <FieldControl 
                                name="rememberMe"
                                render={( {handler}) => (
                                    <div>
                                        <Form.Check 
                                        type="checkbox" 
                                        label="Remember me"
                                         {...handler("checkbox")} />
                                    </div>
                                )} /> */}
                            </Form.Group>
                            <Button
                            fullWidth
                            variant="contained" 
                            type="submit"
                            id="login-form button"
                            className="text-capitalize"
                            >
                                Log in
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                <p className="mt-5 separator">or</p>
                <div className="text-center">
                    <p className="mt-3">Log in with</p>

                    <a href="https://facebook.com">
                        <i className="fab fa-facebook Soc-icon"></i>
                    </a>
                    <a href="https://gmail.com">
                        <i className="fab fa-google Soc-icon"></i>
                    </a>
                    <a href="https://twitter.com">
                        <i className="fab fa-twitter Soc-icon"></i>
                    </a>
                </div>

                <p className="mt-5 separator">o</p>

                <p className="text-center">
                    Don&apos;t have an account? <a className="ml-1" href="/register">Sign up</a>
                </p>
            </div>
        </div>
    );

    // }
}

export default LogIn;
