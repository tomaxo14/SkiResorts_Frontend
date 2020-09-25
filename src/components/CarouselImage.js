import React from 'react';
import { Carousel, Button } from 'react-bootstrap'
import AuthService from '../services/auth.service'
import Slide1 from '../img/slide1.jpg';
import Slide2 from '../img/slide2.jpg';
import Slide3 from '../img/slide3.jpg';

import '../styles/CarouselImage.css';

class CarouselImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogged: AuthService.getCurrentUser()
        }
    }


    render() {
        return (

            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Slide1}
                        alt="First slide"
                    />
                    <Carousel.Caption className="first-caption">
                        <h3 id="first-caption-title">Nie wiesz gdzie jechać na narty?</h3>
                        <p id="first-caption-text">Aplikacja PolandSki pomoże Ci w wyborze odpowiedniego ośrodka narciarskiego.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Slide2}
                        alt="Third slide"
                    />

                    <Carousel.Caption className="caption">
                        <h3 id="second-caption-title">Dlaczego warto się zarejestrować?</h3>
                        <a href="#zalety"><Button id="check-button" variant="outline-dark">Sprawdź</Button></a>
                        <a href="/rejestracja"><Button id="signup-button" variant="outline-dark">Zarejestruj się</Button></a>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Slide3}
                        alt="Third slide"
                    />

                    <Carousel.Caption className="caption">
                        <h3></h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}

export default CarouselImage;