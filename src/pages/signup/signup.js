import React, { Component } from 'react'
import { Card, Form, Button, InputGroup } from 'react-bootstrap'
import axios from 'axios';
import $ from 'jquery';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators
} from 'react-reactive-form';

// let $;

function _registerUser (registerFormValue) {
    $("#email-register-btn")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );

    // var formData = new FormData(); 
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("password", password);
    console.log(registerFormValue);
    

    axios 
      .post("/register", registerFormValue)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.status === 201) {
          alert(`Registration Successful!`);

          let userData = {
            name: json.data.name,
            id: json.data.id,
            email: json.data.email,
            auth_token: json.data.token,
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
          $("#email-register-btn")
            .removeAttr("disabled")
            .html("Register");
        }
      })
      .catch(error => {
        alert("An Error Occured!" + error);
        console.log(`${registerFormValue} ${error}`);
        $("#email-register-btn")
          .removeAttr("disabled")
          .html("Register");
      });
  };


  const TextInput = ({ handler, touched, hasError, meta }) => (
    
    <Form.Control
       type={`${meta.name}`} 
       placeholder={`Enter ${meta.label}`}
       {...handler()} />

)

class SignUp extends Component {

    registerForm = FormBuilder.group({
        // id: [],
        name: [""],
        email: ["", Validators.required],
        password: ["", Validators.required],
        phone_number: ["", Validators.required],
    });

    handleRegister = e => {
        e.preventDefault();

        // if(this.registerForm.value.password !== this.registerForm.value.confirm_password) {
        //     console.log("not match")
        // } else {

        _registerUser(this.registerForm.value);
    // }
    };

    
    componentDidMount() {

        var navbar = document.querySelector("nav");
        navbar.classList.remove("navbar-dark", "bg-dark", "shadow");
        navbar.classList.add("navbar-light", "bg-light", "shadow");

      }

      componentWillUnmount() {
        window.removeEventListener('scroll');
      }


    render() {
        return (
            <div>
                <div className="container mt-5 pt-5 custom-form">
                    <Card className="form-shadow">
                        <Card.Body>
                            <h5 className="text-center mb-5">Create your free account</h5>
    
                            <FieldGroup 
                            control={this.registerForm}
                            render={({ get, invalid }) => (
                            <Form action="" onSubmit={this.handleRegister} method="post">
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <i className="fas fa-user"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FieldControl 
                                        render={TextInput}
                                        meta={{ label: "Full name", name: "Full name" }}
                                        id="name"
                                        name="name" />
                                    </InputGroup>
                                </Form.Group>
    
                                {/* <Form.Group controlId="formBasicLastName">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <i className="fas fa-user"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Enter last name"
                                        ref={input => (_lastName = input)}
                                        id="lastName"
                                        name="lastName" />
                                    </InputGroup>
                                </Form.Group> */}
    
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <i className="fas fa-envelope"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FieldControl 
                                        render={TextInput}
                                        meta={{ label: "Email", name: "email" }}
                                        id="email"
                                        name="email" />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <i className="fas fa-phone-alt"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FieldControl 
                                        render={TextInput}
                                        meta={{ label: "Phone", name: "phone" }}
                                        id="phone"
                                        name="phone" />
                                    </InputGroup>
                                </Form.Group>
    
                                <Form.Group controlId="formBasicPassword">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <i className="fas fa-lock"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    <FieldControl  
                                    render={TextInput}
                                    meta={{ label: "Password", name: "password"  }}
                                    id="password"
                                    name="password" />
                                    </InputGroup>
                                </Form.Group>
    
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <i className="fas fa-lock"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    <FieldControl  
                                    render={TextInput}
                                    name="confirm_password"
                                    meta={{ label: "Confirm Password", name: "password"  }}
                                     />
                                    </InputGroup>
                                </Form.Group>
    
                                <Form.Group controlId="formBasicCheckbox">
                                    <FieldControl 
                                    name="privacyAgreement"
                                    render={( {handler}) => (
                                        <div>
                                        <Form.Check 
                                        type="checkbox" 
                                        label="I accept the Term of use & privacy policy"
                                         {...handler("checkbox")} />
                                    </div>
                                )} />
                                </Form.Group>
                                <Button variant="primary" type="submit"
                                id="email-register-btn">
                                    Sign up
                                </Button>
                            </Form>
                            )}
                            />
                        </Card.Body>
                    </Card>
    
                    <p className="mt-5 separator">or</p>
                    <div className="text-center">
                        <p className="mt-3">Sign up with</p>
    
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
                        Already have an account?
                        <a className="ml-1" href="/login">Log in</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default SignUp;