import React from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';
import '../styles/ResortsListElement.css';

const ResortsListElement = (props) => {

    const resorts_data = props.resorts;

    return (<div>
        <CardGroup>
        {resorts_data.map(
            resort => (
                <div key={resort.resortId}>
                    <Card style={{ width: '30rem' }} className="card">

                        <Card.Body >

                            <Card.Title>{resort.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{resort.location.country}</Card.Subtitle>
                            <div class="row no-gutters">
                            <div className="col-md-6">
                            <Card.Text>
                                Ocena
                                <br></br>
                                {resort.avgRating}
                            </Card.Text>
                            </div>
                            <div className="col-md-6">
                            <Card.Text>
                                Niebieskie: {resort.blueSlopes} 
                                <br></br>
                                Czerwone: {resort.redSlopes}
                                <br></br>
                                Czarne: {resort.blackSlopes} 
                            </Card.Text>
                            </div>

                            </div>
                            <Button className="card-button">Więcej</Button>
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