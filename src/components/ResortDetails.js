import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ResortService from '../services/resort-service';
import NavBar from './NavBar';
import '../styles/ResortDetails.css';

class ResortDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resort_details: [],
            hasWebsite: false,
            location: []
        }
    }

    async componentDidMount() {
        const resort = await ResortService.getResortById(this.props.match.params.id);
        this.setState({ resort_details: resort.data, location: resort.data.location });
        console.log(resort);
        if(this.state.resort_details.website!=null){
            this.setState({hasWebsite: true});
        }
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
                            Twoja ocena: null
                        </Col>
                        <Col xs={6} md={4} id="title-column">
                            <h1>{this.state.resort_details.name}</h1>
                            <h3>{this.state.location.country}</h3>
                        </Col>
                        <Col xs={6} md={4}>
                            
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
                                Gondole: {this.state.resort_details.gondolas}
                            </p>
                            <p>
                                Kanapy: {this.state.resort_details.chairlifts}
                            </p>
                            <p>
                                Orczyki: {this.state.resort_details.tbars}
                            </p>
                            <p>
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
                    <Row className="row">
                        <Col xs={6}>xs=6</Col>
                        <Col xs={6}>xs=6</Col>
                    </Row>
                </Container>
            </div>
        )
    }



}

export default ResortDetails;