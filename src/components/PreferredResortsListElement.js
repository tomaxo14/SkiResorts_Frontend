import React from 'react';
import { Card, Button, CardGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { ImStatsBars } from "react-icons/im";
import '../styles/PreferredResortsListElement.css';

const PreferredResortsListElement = (props) => {

    function polishCountryName (countryName) {
        if(countryName==="Poland") return "Polska"
        if(countryName==="Czech Republic") return "Czechy"
        if(countryName==="Slovakia") return "Słowacja"
    }

    function truncate(value) {
        return Math.floor(value * 10) / 10;
    }

    return (<div>
        <CardGroup id="card-group">
        {props.resortsWithPoints.data.map(
            resort => (
                <div key={resort.first.resortId}>
                    <Card style={{ width: '30rem' }} className="card">

                        <Card.Body >

                            <Card.Title>{resort.first.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {polishCountryName(resort.first.location.country)}
                            </Card.Subtitle>
                            <div className="row no-gutters">
                            <div className="col-md-6">
                            <br></br>
                            <Card.Text>
                                <i>Ocena użytkowników</i>
                                <br></br>
                                <h4>
                                <i className="star icon"></i>
                                {resort.first.avgRating.toFixed(1)}
                                </h4>
                            </Card.Text>
                            </div>
                            <div className="col-md-6">
                            <br></br>
                            <Card.Text>
                                <i className="circle icon" id="blue-circle"></i>
                                Trasy niebieskie: <b>{resort.first.blueSlopes}</b>
                                <br></br>
                                <i className="circle icon" id="red-circle"></i>
                                Trasy czerwone: <b>{resort.first.redSlopes}</b>
                                <br></br>
                                <i className="circle icon"></i>
                                Trasy czarne: <b>{resort.first.blackSlopes} </b>
                            </Card.Text>
                            </div>
                            {props.userLat!==0 && props.userLon!==0 ? (
                                <div id="distance-div">
                                <i className="map marker alternate icon"></i>
                                Dystans od Twojej lokalizacji: <b>{truncate(resort.first.distance)} km</b>
                                </div>
                                ) : (
                                < div id="distance-div">
                                <i className="map marker alternate icon"></i>
                                Zezwól na dostęp do Twojej lokalizacji i odśwież stronę aby zobaczyć dystans do ośrodka
                                </div>
                                )} 
                            </div>
                            <div id="rating">
                            <ImStatsBars size="23" id="stats-icon" />
                                <span id="rating-text">Rekomendacja dla Ciebie: <b>{resort.second}/100</b></span>
                            </div>
                            <div id="button-div">
                            <Link to={"/osrodek/" + resort.first.resortId}><Button className="card-button">Więcej</Button></Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )
        )
        }
        </CardGroup>
        </div>
    )
}
export default PreferredResortsListElement;