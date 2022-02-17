import { useEffect, useState } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// let $;

function _registerUser(registerFormValue) {
  $("#email-register-btn")
    .attr("disabled", "disabled")
    .html(
      "<i class='fa fa-spinner fa-spin fa-1x fa-fw'></i><span class='sr-only'>Loading...</span>"
    );

  // var formData = new FormData();
  // formData.append("name", name);
  // formData.append("email", email);
  // formData.append("password", password);
  console.log(registerFormValue);

  axios
    .post("/api/auth/signup", registerFormValue)
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((json) => {
      if (json.status === 201) {
        alert("Registration Successful!");

        let userData = {
          name: json.data.name,
          id: json.data.id,
          email: json.data.email,
          auth_token: json.data.token,
          timestamp: new Date().toString(),
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isLoggedIn: appState.isLoggedIn,
          user: appState.user,
        });
      } else {
        alert("Registration Failed!");
        $("#email-register-btn").removeAttr("disabled").html("Register");
      }
    })
    .catch((error) => {
      alert("An Error Occured!" + error);
      console.log(`${registerFormValue} ${error}`);
      $("#email-register-btn").removeAttr("disabled").html("Register");
    });
}

const TextInput = ({ handler, meta }) => (
  <Form.Control
    type={`${meta.name}`}
    placeholder={`Enter ${meta.label}`}
    {...handler}
  />
);

TextInput.propTypes = {
  handler: PropTypes.any,
  touched: PropTypes.any,
  hasError: PropTypes.any,
  meta: PropTypes.any,
};

const formSchema = yup
  .object()
  .shape({
    name: yup.string().required("This field is required"),
    email: yup.string().required("This field is required"),
    phone: yup.string().required("This field is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at 8 char long"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords does not match"),
  })
  .required();

function SignUp() {
  //   const formOptions = { resolver: yupResolver(formSchema) };

  const [acceptTerm, setAcceptTerm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleRegister = (e) => {
    // e.preventDefault();

    // if(this.registerForm.value.password !== this.registerForm.value.confirm_password) {
    //     console.log("not match")
    // } else {

    _registerUser(e);
    // }
  };

  useEffect(() => {
    var navbar = document.querySelector("nav");
    navbar.classList.remove("navbar-dark", "bg-dark", "shadow");
    navbar.classList.add("navbar-light", "bg-light", "shadow");

    // return function cleanup() {
    //   window.removeEventListener("scroll");
    // };
  });

  // render() {
  return (
    <div>
      <div className="container mt-5 pt-5 custom-form">
        <Card className="form-shadow">
          <Card.Body>
            <h5 className="text-center mb-5">Create your free account</h5>

            <Form
              action=""
              onSubmit={handleSubmit(handleRegister)}
              method="post"
            >
              <Form.Group className="mb-4">
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <TextInput
                    handler={{ ...register("name", { required: true }) }}
                    meta={{ label: "Full name", name: "Full name" }}
                  />
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

              <Form.Group className="mb-4">
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-envelope"></i>
                  </InputGroup.Text>
                  <TextInput
                    handler={{ ...register("email", { required: true }) }}
                    meta={{ label: "Email", name: "email" }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4">
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-phone-alt"></i>
                  </InputGroup.Text>
                  <TextInput
                    handler={{ ...register("phone", { required: true }) }}
                    meta={{ label: "Phone", name: "phone" }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-lock"></i>
                  </InputGroup.Text>
                  <TextInput
                    handler={{
                      ...register("password", { required: true }),
                    }}
                    meta={{ label: "Password", name: "password" }}
                    className={`${errors.password ? "is-invalid" : ""}`}
                  />
                </InputGroup>
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </Form.Group>

              {/* confirm password */}
              <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-lock"></i>
                  </InputGroup.Text>
                  <TextInput
                    handler={{
                      ...register("confirmPassword", { required: true }),
                    }}
                    meta={{ label: "Confirm Password", name: "password" }}
                    className={`${errors.password ? "is-invalid" : ""}`}
                  />
                </InputGroup>
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicCheckbox">
                <div>
                  <Form.Check
                    type="checkbox"
                    label="I accept the Term of use & privacy policy"
                    onChange={(check) => setAcceptTerm(check.target.checked)}
                  />
                </div>
              </Form.Group>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                id="email-register-btn"
                className="text-capitalize"
                disabled={acceptTerm === false}
              >
                Sign up
              </Button>
            </Form>
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
          <a className="ms-1" href="/login">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
  // }
}

export default SignUp;
