import React from 'react';
import "./NavBar";
import NavBar from './NavBar';
import CarouselImage from './CarouselImage';
import HomeInfo from './HomeInfo';
import Footer from './Footer';

class Home extends React.Component {

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <CarouselImage></CarouselImage>
                <HomeInfo></HomeInfo>
                <Footer></Footer>
            </div>
        )
    }
}

export default Home;