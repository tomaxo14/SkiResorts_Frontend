import React from 'react';
import ResortService from '../services/resort-service.js';
import NavBar from './NavBar';
import Footer from './Footer';
import ResortsListElement from './ResortsListElement.js';
import '../styles/ResortList.css';

class ResortsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resorts_data: [],
            isLoaded: false,
            userLat: 0,
            userLon: 0,
            locationReady: false
        }
        this.helperFunction = this.helperFunction.bind(this);
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.helperFunction);
        this.sleep(500).then(async() => {
            const resorts = await ResortService.getAllResortsWithGeo(this.state.userLat, this.state.userLon);
            this.setState({ resorts_data: resorts.data, isLoaded: true });
            console.log(resorts);
        })
        // const resorts = await ResortService.getAllResortsWithGeo(this.state.userLat, this.state.userLon);
    }

    async helperFunction(position){
        const lat = await position.coords.latitude;
        const long = await position.coords.longitude;
        this.setState({userLat: lat, userLon: long});
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div>
                    <NavBar></NavBar>
                    <div className="ui segment">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader" id="loader">Ładowanie ośrodków</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <NavBar></NavBar>
                    <ResortsListElement resorts={this.state.resorts_data} userLat={this.state.userLat} userLon={this.state.userLon} />
                    <Footer></Footer>
                </div>
            )
        }
    }
}
export default ResortsList;