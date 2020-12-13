import React from 'react';
import ResortService from '../services/resort-service.js';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import NavBar from './NavBar';
import Footer from './Footer';
import ResortsListElement from './ResortsListElement.js';
import '../styles/ResortList.css';
import { Container } from 'react-bootstrap';

class ResortsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resorts_data: [],
            isLoaded: false,
            userLat: 0,
            userLon: 0,
            locationReady: false,
            userSavedLocation: [],
            userRoles: [],
            admin: false
        }
        this.helperFunction = this.helperFunction.bind(this);
    }

    async componentDidMount() {
        const user = AuthService.getCurrentUser();
        
        if(user !== undefined && user !== null) {
            this.setState({ userRoles: user.roles },
            function () {
                if (this.ifAdmin()===true) {
                    this.setState({ admin: true });
                }
            })
        }

        var savedLocation = undefined;
        if (user != undefined) {
            savedLocation = await UserService.yourLocation();
            this.setState({userSavedLocation: savedLocation.data})
            console.log(savedLocation);            
        }
        if(savedLocation!==undefined && this.state.userSavedLocation!=="" && this.state.userSavedLocation!==[]){
            this.setState({userLat: this.state.userSavedLocation.latitude, userLon: this.state.userSavedLocation.longitude})
        } else {
                navigator.geolocation.getCurrentPosition(this.helperFunction);    
        }
        this.sleep(500).then(async() => {
            const resorts = await ResortService.getAllResortsWithGeo(this.state.userLat, this.state.userLon);
            this.setState({ resorts_data: resorts.data, isLoaded: true });
            console.log(resorts);
        })
    
        
        // const resorts = await ResortService.getAllResortsWithGeo(this.state.userLat, this.state.userLon);
    }

    ifAdmin() {
        var i;
        for (i = 0; i < this.state.userRoles.length; i++) {
            if (this.state.userRoles[i] === "ROLE_ADMIN") {
                return true;
            }
        }
        return false;
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
                    <ResortsListElement resorts={this.state.resorts_data} userLat={this.state.userLat} userLon={this.state.userLon} admin={this.state.admin} />
                    <Footer></Footer>
                </div>
            )
        }
    }
}
export default ResortsList;