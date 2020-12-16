import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import MyModal from './MyModal';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import { Button, Container } from 'react-bootstrap';
import ReactMapGL, {Marker} from 'react-map-gl';
import '../styles/UserLocation.css'

class UserLocation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            userLocation: [],
            isLoaded: false,
            showModal: false,
            viewport: {
                width: 500,
                height: 300,
                latitude: 52.0,
                longitude: 19.0,
                zoom: 5
            }
        }
        this.onSaveButton = this.onSaveButton.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    async componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user !== undefined) {
            this.setState({userData: user.data, userLocation: this.state.userData.location, isLoaded: true })
            console.log(this.state.userLocation);
        }
    }

    onSaveButton(){
        UserService.saveLocation(this.state.viewport.latitude, this.state.viewport.longitude);
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render(){
        return(
            <div>
            <NavBar></NavBar>
            <Container id="location-container">
                {/* <Map lat={0.0} lon={0.0} zoom={5} maxZoom={16} minZoom={4} /> */}
                <h2>Przypisz do swojego konta lokalizację, według której ma być liczona odległość do ośrodków</h2>
                <h6>Aby wybrać lokalizację ustaw czerwony znacznik nad miejscem docelowym. Mapę możesz przesuwać poprzez przesuwanie myszy
                     wraz z wciśniętym lewym przyciskiem myszy, jeśli mysz jest ustawiona na mapie. Możesz również przybliżać i oddalać mapę
                    używając gałki myszy.
                </h6>
                <div id="map-paragraph">
                <ReactMapGL
                id="map-frame"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                maxZoom={16}
                minZoom={4}
                mapboxApiAccessToken="pk.eyJ1IjoidG9tYXhvIiwiYSI6ImNraHJ2eTliNjBuNmEyeHBiOXRhNWhuZTcifQ.Ra13ZFPaEfeoEi_O7osVsw"
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}
            >
                {this.state.hasLocation ? (
                    <Marker
                    latitude={parseFloat(this.props.lat)}
                    longitude={parseFloat(this.props.lon)}>
                        <i className="red big map marker alternate icon"></i>
                    </Marker>
                ):(
                    <Marker
                    latitude={this.state.viewport.latitude}
                    longitude={this.state.viewport.longitude}>
                        <i className="red big map marker alternate icon"></i>
                    </Marker>)}
            </ReactMapGL>
            </div>
            <div>
                <Button id="save-button" className="button" onClick={this.onSaveButton}>Zapisz lokalizację</Button>
                <MyModal title="Powiadomienie" body="Zapisano lokalizację" show={this.state.showModal} onHide={this.closeModal} />
            </div>
            </Container>
            <div id="location-footer-div"><Footer></Footer></div>
            </div>
        )
    }

}
export default UserLocation;