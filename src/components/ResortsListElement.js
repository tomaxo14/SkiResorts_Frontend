import React from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';
import '../styles/ResortsListElement.css';
import {Link} from 'react-router-dom';

const ResortsListElement = (props) => {

    const resorts_data = props.resorts;
    function polishCountryName (countryName) {
        if(countryName==="Poland") return "Polska"
        if(countryName==="Czech Republic") return "Czechy"
        if(countryName==="Slovakia") return "Slovakia"
    }
    
    return (<div>
        <CardGroup>
        {resorts_data.map(
            resort => (
                <div key={resort.resortId}>
                    <Card style={{ width: '30rem' }} className="card">

                        <Card.Body >

                            <Card.Title>{resort.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {polishCountryName(resort.location.country)}
                            </Card.Subtitle>
                            <div className="row no-gutters">
                            <div className="col-md-6">
                            <br></br>
                            <Card.Text>
                                <i>Ocena użytkowników</i>
                                <br></br>
                                <h4>
                                <i className="star icon"></i>
                                {resort.avgRating}
                                </h4>
                            </Card.Text>
                            </div>
                            <div className="col-md-6">
                            <Card.Text>
                                <i className="circle icon" id="blue-circle"></i>
                                Trasy niebieskie: {resort.blueSlopes} 
                                <br></br>
                                <i className="circle icon" id="red-circle"></i>
                                Trasy czerwone: {resort.redSlopes}
                                <br></br>
                                <i className="circle icon"></i>
                                Trasy czarne: {resort.blackSlopes} 
                            </Card.Text>
                            </div>

                            </div>
                            <div id="button-div">
                            <Link to={"/osrodek/" + resort.resortId}><Button className="card-button">Więcej</Button></Link>
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
export default ResortsListElement;