import React from 'react';
import { Carousel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import "./NavBar";
import NavBar from './NavBar';
import CarouselImage from './CarouselImage';
import HomeInfo from './HomeInfo';

class Home extends React.Component {

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <CarouselImage></CarouselImage>
                <HomeInfo></HomeInfo>
            </div>
        )
    }
}

export default Home;