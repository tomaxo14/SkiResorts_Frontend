import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { WiThermometer, WiThermometerExterior, WiHumidity, WiStrongWind, WiHorizonAlt, WiCloudy, WiDust } from 'weather-icons-react';
// import {Map, GoogleApiWrapper} from 'google-map-react'
import ResortService from '../services/resort-service';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import NavBar from './NavBar';
import Footer from './Footer';
import RateResort from './RateResort';
import FutureWeather from './FutureWeather';
import Opinion from './Opinion';
import MyModal from './MyModal';
import Map from './Map';
import '../styles/ResortDetails.css';
import Talerzyk from "../img/ski_lift_icons/talerzyk.png";
import Gondola from "../img/ski_lift_icons/gondola.png";
import Kanapa from "../img/ski_lift_icons/kanapa.png";
import Orczyk from "../img/ski_lift_icons/orczyk.png";
import { Link } from "react-router-dom";

class ResortDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resort_details: [],
            hasWebsite: false,
            location: [],
            currentUser: undefined,
            ratings: [],
            opinions: [],
            favourites: [],
            inFavourites: false,
            favouriteMessage: undefined,
            addFavModal: false,
            deleteFavModal: false,
            weather: [],
            mainWeather: [],
            wind: [],
            clouds: [],
            weatherDescription: [],
            futureWeatherDaily: [],
            weatherReady: false,
            isLoaded: false,
            alreadyRated: true
        }

        this.onClickFavButton = this.onClickFavButton.bind(this);
        this.onClickDeleteFavButton = this.onClickDeleteFavButton.bind(this);
        this.afterDeleteFav = this.afterDeleteFav.bind(this);
        this.afterAddFav = this.afterAddFav.bind(this);
    }

    async componentDidMount() {
        const resort = await ResortService.getResortById(this.props.match.params.id);
        const user = AuthService.getCurrentUser();
        var ratings = undefined;
        var favourites = undefined;
        if (user !== undefined && user!== null) {
            ratings = await UserService.yourRatings();
            favourites = await UserService.yourFavourites();
            this.setState({ ratings: ratings.data, favourites: favourites.data })
        }
        this.setState({
            resort_details: resort.data, location: resort.data.location, currentUser: user,
            opinions: resort.data.opinions
        });
        var i;
        for (i = 0; i < this.state.favourites.length; i++) {
            if (this.state.favourites[i].resortId === this.state.resort_details.resortId) {
                this.setState({ favouriteMessage: "Twój ulubiony", inFavourites: true });
            }
        }
        if (this.state.inFavourites === false) {
            this.setState({ favouriteMessage: "Dodać do ulubionych?" });
        }
        console.log(resort);
        console.log(user);
        console.log(this.state.opinions);
        console.log(this.state.ratings);
        if (this.state.resort_details.website !== null && this.state.resort_details.website !== "") {
            this.setState({ hasWebsite: true });
        }
        const weather = await ResortService.getWeather(this.state.location.latitude, this.state.location.longitude);
        const futureWeather = await ResortService.getWeatherSevenDays(this.state.location.latitude, this.state.location.longitude);
        console.log(weather);
        console.log(futureWeather);
        this.setState({
            weather: weather.data, mainWeather: weather.data.main, wind: weather.data.wind, clouds: weather.data.clouds,
            weatherDescription: weather.data.weather, futureWeatherDaily: futureWeather.data.daily, weatherReady: true
        });
        console.log(this.state.futureWeatherDaily);
        console.log(this.state.location.latitude);
        if(this.ratedByUser()===" Nie oceniono") {
            this.setState({alreadyRated: false})
            console.log(this.state.alreadyRated);
        }
        this.setState({ isLoaded: true })
    }


    async updateAfterAction(resortId) {
        const resort = await ResortService.getResortById(resortId);
        console.log(resort);
        const ratings = await UserService.yourRatings();
        this.setState({
            ratings: ratings.data,
            opinions: resort.data.opinions
        });
    }

    ratedByUser() {
        var i;
        for (i = 0; i < this.state.ratings.length; i++) {
            if (this.state.ratings[i].resort === this.state.resort_details.resortId) {              
                return " " + this.state.ratings[i].value;
            }
        }
        return " Nie oceniono"

    }



    polishCountryName(countryName) {
        if (countryName === "Poland") return "Polska"
        if (countryName === "Czech Republic") return "Czechy"
        if (countryName === "Slovakia") return "Słowacja"
    }

    onClickFavButton() {
        UserService.addFavourite(this.state.resort_details.resortId);
        this.setState({ addFavModal: true })
    }

    onClickDeleteFavButton() {
        UserService.deleteFavourite(this.state.resort_details.resortId);
        this.setState({ deleteFavModal: true })
    }

    afterAddFav() {
        this.setState({ addFavModal: false, favouriteMessage: "Twój ulubiony", inFavourites: true });
    }

    afterDeleteFav() {
        this.setState({ deleteFavModal: false, favouriteMessage: "Dodać do ulubionych?", inFavourites: false });
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div>
                    <NavBar></NavBar>
                    <div className="ui segment">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader" id="loader">Ładowanie</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <NavBar></NavBar>
                    <Container className="container">
                        <Row className="row">
                            <Col xs={12} md={3} id="ratings-col">
                                <i className="star icon"></i>
                            Średnia ocen: {this.state.resort_details.avgRating.toFixed(1)}
                                <br></br>
                                <i className="hand point up icon"></i>
                            Twoja ocena:
                                {this.state.currentUser === undefined || this.state.currentUser === null ? (
                                    " Zaloguj się, aby wystawić ocenę"
                                ) : (
                                        this.ratedByUser()
                                    )
                                }

                                <div>
                                    {this.state.currentUser === undefined || this.state.currentUser === null ? (
                                        <p>
                                            <br></br>
                                            {/* <Button href="/logowanie" className="button">Zaloguj się aby dodać ośrodek do ulubionych</Button> */}
                                            <Link to="/logowanie"><Button className="button">Zaloguj się aby dodać ośrodek do ulubionych</Button></Link>
                                        </p>
                                    ) : (
                                            <div>
                                                <br></br>
                                                <i className="heart icon"></i>
                                                {this.state.favouriteMessage}

                                                {this.state.inFavourites === true ? (
                                                    <div>
                                                        <br></br>
                                                        <Button className="button" onClick={this.onClickDeleteFavButton}>Usuń ośrodek z ulubionych</Button>
                                                        <MyModal title="Powiadomienie" body="Usunięto ośrodek z ulubionych" show={this.state.deleteFavModal} onHide={this.afterDeleteFav} />
                                                    </div>
                                                ) : (
                                                        <div>
                                                            <br></br>
                                                            <Button id="fav-button" className="button" onClick={this.onClickFavButton}>Dodaj ośrodek do ulubionych</Button>
                                                            <MyModal title="Powiadomienie" body="Dodano ośrodek do ulubionych" show={this.state.addFavModal} onHide={this.afterAddFav} />
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    }


                                </div>
                            </Col>
                            <Col xs={10} md={5} id="title-column">
                                <h1>{this.state.resort_details.name}</h1>
                                <h3>{this.polishCountryName(this.state.location.country)}</h3>
                            </Col>
                            <Col className="rate-resort" xs={7} md={4}>
                                <RateResort resortId={this.state.resort_details.resortId} afterRate={() => this.updateAfterAction(this.state.resort_details.resortId)} user={this.state.currentUser} alreadyRated={this.state.alreadyRated}></RateResort>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col xs={10} md={5} id="info-col">
                                <h3>Informacje</h3>
                                {this.state.hasWebsite ? (
                                    <p>
                                        <i className="globe icon"></i>
                                    Strona internetowa: <a href={this.state.resort_details.website}><b id="website"> {this.state.resort_details.website} </b></a>
                                    </p>) : (
                                        <br></br>
                                    )}
                                <p>
                                    <i className="circle icon" id="blue-circle"></i>
                                Trasy niebieskie: <b>{this.state.resort_details.blueSlopes}</b>
                                </p>
                                <p>
                                    <i className="circle icon" id="red-circle"></i>
                                Trasy czerwone: <b>{this.state.resort_details.redSlopes}</b>
                                </p>
                                <p>
                                    <i className="circle icon"></i>
                                Trasy czarne: <b>{this.state.resort_details.blackSlopes}</b>
                                </p>
                                <p>
                                    <img src={Gondola} width="12" height="15" className="lifts-img" alt="Gondola"></img>
                                Gondole: <b>{this.state.resort_details.gondolas}</b>
                                </p>
                                <p>
                                    <img src={Kanapa} width="15" height="15" className="lifts-img" alt="Kanapa"></img>
                                Kanapy: <b>{this.state.resort_details.chairlifts}</b>
                                </p>
                                <p>
                                    <img src={Orczyk} width="15" height="15" className="lifts-img" alt="Orczyk"></img>
                                Orczyki: <b>{this.state.resort_details.tbars}</b>
                                </p>
                                <p>
                                    <img src={Talerzyk} width="15" height="15" className="lifts-img" alt="Talerzyk"></img>
                                Wyciągi talerzowe: <b>{this.state.resort_details.platters}</b>
                                </p>
                                <p>
                                    <i className="road icon"></i>
                                Taśmociągi: <b>{this.state.resort_details.carpets}</b>
                                </p>
                                <p>
                                    <i className="trophy icon"></i>
                                {/* Snowpark: {this.state.resort_details.ifSnowPark} */}
                                    Snowpark: <b>nie posiada</b>
                                </p>
                            </Col>
                            <Col xs={8} md={6} id="img-col">
                                <h3>Mapa tras i wyciągów</h3>
                                <a href={this.state.resort_details.skiMap}><img src={this.state.resort_details.skiMap} title="Kliknij aby powiększyć" alt="Mapa" id="skiMap" width="520" height="400"></img></a>

                            </Col>
                        </Row>
                        <Row id="third-row">
                            <Col xs={10} md={6} id="weather-col">
                                <h3 id="actual-weather-title">Aktualna pogoda</h3>
                                <p>
                                    <WiThermometer size="24" className="weather-icon"></WiThermometer>
                            Temperatura: <b>{this.state.mainWeather.temp} &#8451; </b>
                                </p>
                                <p>
                                    <WiThermometerExterior size="24" className="weather-icon"></WiThermometerExterior>
                            Temperatura odczuwalna: <b> {this.state.mainWeather.feels_like} &#8451; </b>
                                </p>
                                <p>
                                    <WiHumidity size="24" className="weather-icon"></WiHumidity>
                            Wilgotność: <b> {this.state.mainWeather.humidity}
                                        <span>%</span></b>
                                </p>
                                <p>
                                    <WiStrongWind size="24" className="weather-icon"></WiStrongWind>
                            Prędkość wiatru: <b> {this.state.wind.speed}
                                        <span>&nbsp;m/s</span></b>
                                </p>
                                <p>
                                    <WiHorizonAlt size="24" className="weather-icon"></WiHorizonAlt>
                            Widoczność: <b> {this.state.weather.visibility}
                                        <span>m</span></b>
                                </p>
                                <p>
                                    <WiCloudy size="24" className="weather-icon"></WiCloudy>
                            Chmury: <b> {this.state.clouds.all}
                                        <span>%</span></b>
                                </p>
                                <div>
                                    <WiDust size="24" className="weather-icon"></WiDust>
                            Opis:
                            <b>
                                        {this.state.weatherDescription.map(
                                            desc => (
                                                <span key={desc.id}>
                                                    <span>&nbsp;</span>
                                                    {desc.description}
                                                    {this.state.weatherDescription.length > 1 ? (
                                                        <span>,</span>
                                                    ) : (
                                                            <span></span>
                                                        )}
                                                </span>

                                            )
                                        )
                                        }
                                    </b>
                                </div>

                            </Col>
                            <Col xs={10} md={6} id="weather-col">
                                {this.state.weatherReady ? (
                                    <FutureWeather weather={this.state.futureWeatherDaily}></FutureWeather>
                                ) : (
                                        <p></p>
                                    )}

                            </Col>
                        </Row>
                        <Row id="forth-row">
                            <Col xs={10} md={6}>
                                <h3>Opinie</h3>
                                {this.state.opinions != null ? (
                                    <Opinion opinions={this.state.opinions} />
                                ) : (
                                        <h5>Brak opinii</h5>
                                    )
                                }
                            </Col>

                            <Col xs={6} id="col-map">
                                <div className="div-map">
                                <h3>Ośrodek na mapie</h3>
                                    <Map   lat={this.state.location.latitude} lon={this.state.location.longitude} zoom={8} maxZoom={12} minZoom={7} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Footer></Footer>
                </div>
            )
        }

    }
}

export default ResortDetails;
// export default GoogleApiWrapper({
//     apiKey: ('AIzaSyAPZsBnGGDcs1McAH94Gp3luxepH9079V')
//   })(ResortDetails);