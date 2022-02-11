import React, { Component } from 'react';
import { Card, Container, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { FormBuilder,
    FieldGroup,
    FieldControl,
    Validators } from 'react-reactive-form';
import { Button, Typography, Modal, Fade } from '@mui/material';
import { makeStyles  } from '@mui/styles';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import $ from 'jquery';
import bannerImg from '../assets/img/banner-home.jpg';
import apartmentImg from '../assets/img/add-apartment.png';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


class userProfile extends Component {
    
    // classes = useStyles();
    // const [open, setOpen] = React.useState(false);

    constructor(props) {
        super(props);

        this.state = {
            userDetails: []
        };
    }
    
    componentDidMount() {

        let state = localStorage["appState"];

        if(state) {
            let AppState = JSON.parse(state);

            let token = AppState.user.token;
            if (token) {
            this._getProfile(token);
            }

            // this._getProfile(token);

            if(!AppState.isLoggedIn) {
                window.location = "/login";
              }
        }

        var navbar = document.querySelector("nav");
        navbar.classList.remove("navbar-dark", "bg-dark", "shadow");
        navbar.classList.add("navbar-light", "bg-light", "shadow");

    }

    _getProfile = (token) => {
        axios
        .get(`/profile?token=${token}`)
        .then(response => {
            console.log(response);
            return response;
        })
        .then(json => {
            if(json.status === 200 || json.status === 201) {
                
                this.setState({ userDetails: json.data.user });

                // localStorage["userDetails"] = JSON.stringify(userDetails);
                


            } else console.log("get profile failed");

        })
        .catch(err => {
            console.log(err);
            console.log(err.toString());

            if((err.toString()).indexOf("Request failed with status code 401")) {
                console.log("true");
                
                let appState = {
                    isLoggedIn: false,
                    user: {}
                };
                // save app state with user date in local storage
                localStorage["appState"] = JSON.stringify(appState);
                this.setState(appState);
                window.location = "/login";
            }
        });
;
    }

    

    _logoutUser = () => {
        let appState = {
          isLoggedIn: false,
          user: {}
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        window.location = "/";
      };

      updateProfileForm = FormBuilder.group({});

    modalProfile = () => {
        // console.log(this.state.userDetails.name);
        const classes = useStyles();
        const [open, setOpen] = React.useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleUpdate = () => {
            console.log("hey");
        }

        return (
            <div>
                <button type="button" 
                className="editbtn mr-auto"
                onClick={handleOpen}>
                    Edit Profile
                </button>
                <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <Typography 
                            variant="subtitle1" 
                            id="transition-modal-title"
                            className="mb-3 text-center">Edit Profile</Typography>

                            <FieldGroup id="transition-modal-description"
                            control={this.updateProfileForm}
                            render={({ get, invalid, reset, value }) => (
                            <Form action="" onSubmit={this.handleUpdate} method="post">
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <i className="fas fa-user"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FieldControl
                                        name="name"
                                        options={{ validators: Validators.required }}
                                        render={({ handler, touched, hasError }) => (
                                            <FormControl
                                            id="name"
                                            type="text"
                                            placeholder="Enter name"
                                            value="hi" />
                                        )} />
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
                                        name="phone_number"
                                        value="hey"
                                        type="Tel"
                                        options={{ validators: Validators.required }}
                                        render={({ handler, touched, hasError }) => (
                                            <Form.Control
                                            id="name"
                                            placeholder="Enter phone"
                                             />
                                        )} />
                                    </InputGroup>
                                </Form.Group>
    
                                <Form.Group controlId="formBasicPassword">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <i className="fas fa-location-arrow"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FieldControl
                                        name="location"
                                        value={this.state.userDetails.location}
                                        type="text"
                                        options={{ validators: Validators.required }}
                                        render={({ handler, touched, hasError }) => (
                                            <Form.Control
                                            id="name"
                                            placeholder="Enter location"
                                            {...handler()} />
                                        )} />
                                    
                                         
                                    </InputGroup>
                                </Form.Group>
    
                                <Button variant="outlined" type="submit"
                                id="email-register-btn" className="mt-3 mx-auto">
                                    Update Profile
                                </Button>
                            </Form>
                            )}
                            />

                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }



    render() {
        return (
            <div>
                <Card className="mt-0 pt-0">
                    <Card.Header>
                    <img src={bannerImg} width="100%" height="160px" />

                    <div className="row">

                        <div className="col-sm-12 col-md-9 col-lg-9 proContainer">
                            <img className="rounded-circle profile-image" 
                            src={apartmentImg} width="120px" height="120px" 
                            />

                            <Typography variant="subtitle1" className="mt-2 custom-username">
                                {this.state.userDetails.name}
                            </Typography>
                        </div>

                        <div className="col-sm-12 col-md-3 col-lg-3 mt-2">
                            <this.modalProfile />
                        </div>
                
                    </div>

                        </Card.Header>

                        <Card.Body>
                            <div className="card mt-1 p-4">
                                <Typography variant="subtitle1">Email:</Typography>
                                <Typography variant="subtitle2">{this.state.userDetails.email}</Typography>
                                { 
                                (this.state.userDetails.email_verified_at === null) ?
                                <Typography variant="caption">
                                    <a href="#">verify email</a>
                                </Typography> : null
                                }
                            </div>

                            <div className="card mt-2 p-4">
                                <Typography>Phone:</Typography>
                                {
                                    (
                                        !this.state.userDetails.phone_number === "0" || 
                                        !this.state.userDetails.phone_number === null ) ?
                                
                                <div>
                                    <Typography>{this.state.userDetails.phone_number}</Typography>
                                    <Typography><a href="#">verify phone</a></Typography> 
                                </div>
                                : null
                                }
                            </div>

                            <div className="card mt-2 p-4">
                                <Typography>Location:</Typography>
                                {
                                    (!this.state.userDetails.city === null) ?
                                    <Typography>
                                        {this.state.userDetails.city}, 
                                        {this.state.userDetails.region}
                                    </Typography> : null
                                }
                            </div>

                            <div className="card mt-2 p-4">
                                <Typography>Password:</Typography>
                                <Typography>&#9642;&#9642;&#9642;&#9642;&#9642;&#9642;&#9642;&#9642;</Typography>
                                <Typography>
                                    <a href="#">Change password</a>
                                </Typography>
                            </div>
                        </Card.Body>
                   </Card>
               
                  <Button variant="outlined" color="primary" className="logout-btn" onClick={this._logoutUser}>
                    <Typography >logout</Typography>
                </Button>

                
            </div>
        );
    }
}

export default userProfile;
