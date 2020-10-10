import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ResortService from '../services/resort-service';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import NavBar from './NavBar';
import RateResort from './RateResort';
import Opinion from './Opinion'
import '../styles/ResortDetails.css';
import Talerzyk from "../img/ski_lift_icons/talerzyk.png";
import Gondola from "../img/ski_lift_icons/gondola.png";
import Kanapa from "../img/ski_lift_icons/kanapa.png";
import Krzeslo from "../img/ski_lift_icons/krzeslo.png";
import Orczyk from "../img/ski_lift_icons/orczyk.png";

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
        }
    }

    async componentDidMount() {
        const resort = await ResortService.getResortById(this.props.match.params.id);
        const user = AuthService.getCurrentUser();
        const ratings = await UserService.yourRatings();
        this.setState({ resort_details: resort.data, location: resort.data.location, currentUser: user, ratings: ratings.data,
             opinions: resort.data.opinions});
        console.log(resort);
        console.log(user);
        console.log(this.state.opinions);
        console.log(this.state.ratings);
        if(this.state.resort_details.website!=null){
            this.setState({hasWebsite: true});
        }
    }
    

    async updateAfterAction(resortId) {
        const resort = await ResortService.getResortById(resortId);
        console.log(resort);
        const ratings = await UserService.yourRatings();
        this.setState({ratings: ratings.data,
             opinions: resort.data.opinions});
    }

    ratedByUser() {
        var i;
        for(i=0; i<this.state.ratings.length; i++) {
            if(this.state.ratings[i].resort===this.state.resort_details.resortId) {
                return " " + this.state.ratings[i].value;
            }
        }
        return " Nie oceniono"

    }

    polishCountryName (countryName) {
        if(countryName==="Poland") return "Polska"
        if(countryName==="Czech Republic") return "Czechy"
        if(countryName==="Slovakia") return "Slovakia"
    }

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Container className="container">
                    <Row className="row">
                        <Col xs={6} md={4}>
                            <i className="star icon"></i>
                            Średnia ocen: {this.state.resort_details.avgRating}
                            <br></br>
                            <i className="hand point up icon"></i>
                            Twoja ocena:
                                {this.state.currentUser===undefined ? (
                                    " Zaloguj się, aby wystawić ocenę"
                                ) : (
                                    this.ratedByUser()
                                )
                                }
                        </Col>
                        <Col xs={6} md={4} id="title-column">
                            <h1>{this.state.resort_details.name}</h1>
                            <h3>{this.polishCountryName(this.state.location.country)}</h3>
                        </Col>
                        <Col xs={6} md={4}>
                            <RateResort  resortId={this.state.resort_details.resortId} afterRate={() => this.updateAfterAction(this.state.resort_details.resortId)}></RateResort>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col xs={8} md={6}>
                            {this.state.hasWebsite ? (
                                <p>
                                    <i className="globe icon"></i>
                                    Strona internetowa: {this.state.resort_details.website}
                                </p> ) : (
                                    <br></br>
                            )}
                            <p>
                                <i className="circle icon" id="blue-circle"></i>
                                Trasy niebieskie: {this.state.resort_details.blueSlopes} 
                            </p>
                            <p>
                                <i className="circle icon" id="red-circle"></i>
                                Trasy czerwone: {this.state.resort_details.redSlopes}
                            </p>
                            <p>
                                <i className="circle icon"></i>
                                Trasy czarne: {this.state.resort_details.blackSlopes} 
                            </p>
                            <p>
                                <img src={Gondola} width="12" height="15" className="lifts-img"></img>
                                Gondole: {this.state.resort_details.gondolas}
                            </p>
                            <p>
                                <img src={Kanapa} width="15" height="15" className="lifts-img"></img>
                                Kanapy: {this.state.resort_details.chairlifts}
                            </p>
                            <p>
                                <img src={Orczyk} width="15" height="15" className="lifts-img"></img>
                                Orczyki: {this.state.resort_details.tbars}
                            </p>
                            <p>
                                <img src={Talerzyk} width="15" height="15" className="lifts-img"></img>
                                Wyciągi talerzowe: {this.state.resort_details.platters}
                            </p>
                            <p>
                                <i className="road icon"></i>
                                Taśmociągi: {this.state.resort_details.carpets}
                            </p>
                            <p>
                                <i className="trophy icon"></i>
                                Snowpark: {this.state.resort_details.ifSnowPark}
                            </p>
                        </Col>
                        <Col xs={8} md={6}>
                        <img src={this.state.resort_details.skiMap} id="skiMap" width="400" height="306"></img>

                        </Col>
                    </Row>
                    <Row id="third-row">
                        <Col xs={6}>
                            <h3>Opinie</h3>
                            {this.state.opinions!=null ? (
                            <Opinion opinions={this.state.opinions}/>
                            ) : (
                                <h5>Brak opinii</h5>
                            )
                            }
                            </Col>
                        <Col xs={6}>xs=6</Col>
                    </Row>
                </Container>
            </div>
        )
    }



}

export default ResortDetails;