import React, { Component } from 'react';
import './home.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import CreateAccountImg from "../../assets/img/create-account.png";
import StudentSearchImg from "../../assets/img/student-search.jpg";
import ReservedImg from "../../assets/img/reserved.png";
import ApartmentImg from "../../assets/img/activate-apartment.png";
import AddApartmentImg from "../../assets/img/add-apartment.png";
import { Link } from 'react-router-dom';

class Home extends Component {
    componentDidMount() {
    var scrollpos = window.scrollY;
    var navbar = document.querySelector("nav");

    function add_class_on_scroll() {
      navbar.classList.remove("navbar-dark", "bg-dark", "shadow");
      navbar.classList.add("navbar-light", "bg-light", "shadow");
    }

    function remove_class_on_scroll() {
      navbar.classList.remove("navbar-light", "bg-light", "shadow");
      navbar.classList.add("navbar-dark", "bg-dark");
    }

    window.addEventListener('scroll', function(){
      scrollpos = window.scrollY;

      if(scrollpos > 60) {
        add_class_on_scroll();
      } else {
        remove_class_on_scroll();
      }
    });

    let state = localStorage["appState"];

    if (state) {
      let AppState = JSON.parse(state);
      console.log(AppState);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState});

      if(AppState.isLoggedIn) {
        window.location = "/dashboard";
      }
    }
  }

    render() {
        return (
            <div>
                <div className="top-banner full-width">
                    <div className="bg-overlay">
                        <div className="p-4 align-content-center custom-pos">
                            <h5 className="text-uppercase text-white">
                                <strong>Are you a student?</strong>
                            </h5>

                            <p className="text-wrap text-white">Why wait to come to school before
                                looking for a place to stay.
                                Housing 247 is here to help you find
                                your dream apartment
                            </p>
                            
                            <Button type="button" className="btn btn-warning rounded-pill">
                                <Link to="/register" className="text-white text-decoration-none">
                                    Create account now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mt-4 pt-4 text-center">
                    <h3 className="separator">
                        Welcome to Housing
                    </h3>
                    <p className="mt-5">How it works?</p>

                    <h5 className="m-5">FOR STUDENTS</h5>
                </div>

                <Container className="mb-3">
                    <Row className="mb-5">
                        <Col lg={4} md="auto" sm={12}>
                            <Card className="text-center mb-3">
                                <Card.Header>1. Create an account</Card.Header>
                                <Card.Body>
                                    <Card.Img variant="top" src={CreateAccountImg} />
                                    
                                    <button type="button" className="btn btn-primary rounded">
                                        <Link to="/register" className="text-white text-decoration-none">
                                            Sign up
                                        </Link>
                                    </button>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    It&apos;s actually free to create an account
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col lg={4} md="auto" sm={12}>
                            <Card className="text-center mb-3">
                                <Card.Header>2. Search for an apartment</Card.Header>
                                <Card.Body>
                                    <Card.Img variant="top" src={StudentSearchImg} />
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    Search for apartments based on location and price
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col lg={4} md="auto" sm={12}>
                            <Card className="text-center mb-3">
                                <Card.Header>3. Reserved your apartment</Card.Header>
                                <Card.Body>
                                    <Card.Img variant="top" src={ReservedImg}/>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    Contact the lessor and arrange for reservation awaiting your arrival
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>

                    <h5 className="m-5 pt-3 text-center">
                        FOR HOUSE HOLDERS</h5>
                    <Row>
                        <Col lg={4} md="auto" sm={12}>
                            <Card className="text-center mb-3">
                                <Card.Header>1. Create an account</Card.Header>
                                <Card.Body>
                                    <Card.Img variant="top" src={CreateAccountImg} />
                                    <button type="button" className="btn btn-primary rounded">
                                        <a href="/register" className="text-white text-decoration-none">
                                            Sign up
                                        </a>
                                    </button>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    It&apos;s actually free to create an account
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col lg={4} md="auto" sm={12}>
                            <Card className="text-center mb-3">
                                <Card.Header>2. Add your apartment</Card.Header>
                                <Card.Body>
                                    <Card.Img variant="top" src={AddApartmentImg} />
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    Add your apartment listing, including location and other details
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col lg={4} md="auto" sm={12}>
                            <Card className="text-center mb-3">
                                <Card.Header>3. Activate your listing</Card.Header>
                                <Card.Body>
                                    <Card.Img variant="top" src={ApartmentImg} />
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    Wait for approval and your apartment will be live in no time
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                
            </div>
        );
    }
}

export default Home;
