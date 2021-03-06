import React from 'react';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Container, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import MyModal from './MyModal';
import '../styles/Preferences.css';

const marks = [
    {
        value: 1,
        label: 'Nieistotne',
    },
    {
        value: 2,
        label: 'Mało istotne',
    },
    {
        value: 3,
        label: 'Neutralnie',
    },
    {
        value: 4,
        label: 'Istotne',
    },
    {
        value: 5,
        label: 'Bardzo istotne',
    },
];

class Preferences extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            blue: 3,
            red: 3,
            black: 3,
            snowPark: 3,
            location: 3,
            hasPreferences: false,
            userLat: 0,
            userLon: 0,
            savedLocation: [],
            showModal: false
        }
        this.onSaveClick = this.onSaveClick.bind(this);
        this.handlePosition = this.handlePosition.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    async componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log(user);
        if (user !== undefined && user !== null) {
            this.setState({ currentUser: user })
            const preferences = await UserService.yourPreferences();
            if (preferences != null) {
                this.setState({
                    blue: preferences.data.blueSlopes, red: preferences.data.redSlopes, black: preferences.data.blackSlopes,
                    snowPark: preferences.data.snowPark, location: preferences.data.location, hasPreferences: true
                })
            }
        }
        // navigator.geolocation.getCurrentPosition(function(position){
        //     this.setState({userLat: position.coords.latitude, userLon: position.coords.longitude});
        //     // console.log(position.coords.latitude, position.coords.longitude);
        // });
        var savedLocation = undefined;
        if (user !== undefined && user !== null) {
            savedLocation = await UserService.yourLocation();
            this.setState({savedLocation: savedLocation.data})
            console.log(savedLocation);            
        }
        if(savedLocation!==undefined && this.state.savedLocation!=="" && this.state.savedLocation!==[] ){
            this.setState({userLat: this.state.savedLocation.latitude, userLon: this.state.savedLocation.longitude});
        } else{
            navigator.geolocation.getCurrentPosition(this.handlePosition);
        }
        console.log(this.state.userLat, this.state.userLon);
    }

    handlePosition(location) {
        this.setState({ userLat: location.coords.latitude, userLon: location.coords.longitude });
        console.log(this.state.userLat, this.state.userLon);
    }

    // sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    // }

    onSaveClick() {
        console.log(this.state.blue, this.state.red, this.state.black, this.state.snowPark, this.state.location)
        UserService.addPreferences(this.state.blue, this.state.red, this.state.black, this.state.snowPark, this.state.location);
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Container className="container">
                    <Row>
                    <Col>
                    <h2>Zaznacz jak ważna jest dla Ciebie każda z poniższych cech ośrodka. Następnie aplikacja zarekomenduje ośrodki spełniające Twoje wymagania.</h2>
                    {this.state.hasPreferences ? (
                        <div>
                            <br></br>
                            <h4><i>Twoje zapisane preferencje są następujące:</i></h4>
                        </div>
                    ) : (
                            <span></span>
                        )}

                    
                    <Typography id="discrete-slider" gutterBottom>
                        <b>Liczba tras niebieskich</b>
                    </Typography>
                    <Slider
                        className="slider"
                        id="blueSlopes-slider"
                        value={this.state.blue}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={5}
                        onChange={(e, value) => this.setState({ blue: value })}
                    />
                    <Typography id="discrete-slider" gutterBottom>
                        <b> Liczba tras czerwonych</b>
                    </Typography>
                    <Slider
                        className="slider"
                        id="redSlopes-slider"
                        value={this.state.red}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={5}
                        onChange={(e, value) => this.setState({ red: value })}
                    />
                    <Typography id="discrete-slider" gutterBottom>
                        <b>Liczba tras czarnych</b>
                    </Typography>
                    <Slider
                        className="slider"
                        id="blackSlopes-slider"
                        value={this.state.black}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={5}
                        onChange={(e, value) => this.setState({ black: value })}
                    />
                    <Typography id="discrete-slider" gutterBottom>
                        <b>Występowanie snowparku</b>
                    </Typography>
                    <Slider
                        className="slider"
                        id="snowpark-slider"
                        value={this.state.snowPark}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={5}
                        onChange={(e, value) => this.setState({ snowPark: value })}
                    />
                    <Typography id="discrete-slider" gutterBottom>
                        <b>Odległość od Twojej lokalizacji</b>
                    </Typography>
                    <Slider
                        className="slider"
                        id="location-slider"
                        value={this.state.location}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={5}
                        onChange={(e, value) => this.setState({ location: value })}
                    />
                    <br></br>
                    <br></br>
                    </Col>
                    <Col id="buttons-col">
                    <h4 id="buttons-title">Jeśli skończyłeś wybierać preferencje, zapisz je lub kliknij od razu przycisk <i>"Pokaż rekomendowane ośrodki",</i> jeśli 
                    nie chcesz zapisywać swoich preferencji na przyszłość</h4>
                    {this.state.hasPreferences ? (
                        <div>
                        <Button className="preferences-button" onClick={this.onSaveClick}>Zapisz nowe preferencje</Button>
                        <MyModal title="Powiadomienie" body="Zapisano nowe preferencje" show={this.state.showModal} onHide={this.closeModal} />
                        </div>
                    ) : (
                        <div>
                            {this.state.currentUser===undefined ? (
                                <Link to="/logowanie"><Button className="preferences-button">Zaloguj się, aby zapisać preferencje</Button></Link>
                            ):(<div>
                                <Button className="preferences-button" onClick={this.onSaveClick}>Zapisz preferencje</Button>
                                <MyModal title="Powiadomienie" body="Zapisano preferencje" show={this.state.showModal} onHide={this.closeModal} />
                                </div>
                            )}                            
                        </div>
                        )}

                    <Link
                        to={{
                            pathname: '/preferowaneOsrodki',
                            blue: this.state.blue,
                            red: this.state.red,
                            black: this.state.black,
                            snowPark: this.state.snowPark,
                            location: this.state.location,
                            userLat: this.state.userLat,
                            userLon: this.state.userLon
                        }}>
                        <Button className="preferences-button" id="show-recomended-button">
                            Pokaż rekomendowane ośrodki
                </Button>
                    </Link>
                    </Col>
                    </Row>
                </Container>
                <Footer></Footer>
            </div>
        )
    }

}
export default Preferences;