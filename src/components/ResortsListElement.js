import React from 'react';
import { Card, Button, CardGroup, Container, Row, Col } from 'react-bootstrap';
import '../styles/ResortsListElement.css';
import { Link } from 'react-router-dom';
import ResortService from '../services/resort-service';

const ResortsListElement = (props) => {

    const resorts_data = props.resorts;
    function polishCountryName(countryName) {
        if (countryName === "Poland") return "Polska"
        if (countryName === "Czech Republic") return "Czechy"
        if (countryName === "Slovakia") return "Slovakia"
    }
    let sortedResorts = [...resorts_data];
    const [sortedField, setSortedField] = React.useState(null);
    if (sortedField !== null) {
        sortedResorts.sort((a, b) => {
            if (sortedField !=='distance') {
                if (a[sortedField] < b[sortedField]) {
                    return 1;
                }
                if (a[sortedField] > b[sortedField]) {
                    return -1;
                }

                return 0;
            } else {
                if (a[sortedField] < b[sortedField]) {
                    return -1;
                }
                if (a[sortedField] > b[sortedField]) {
                    return 1;
                }

                return 0;
            }
        }
        );
    }


    const [choosenCountry, setChoosenCountry] = React.useState('');
    const [choosenRating, setChoosenRating] = React.useState('');
    const [choosenBlue, setChoosenBlue] = React.useState('');
    const [choosenRed, setChoosenRed] = React.useState('');
    const [choosenBlack, setChoosenBlack] = React.useState('');


    function updateSearchCountry(event) { setChoosenCountry(event.target.value); }
    function updateSearchRating(event) { setChoosenRating(event.target.value); }
    function updateSearchBlue(event) { setChoosenBlue(event.target.value); }
    function updateSearchRed(event) { setChoosenRed(event.target.value); }
    function updateSearchBlack(event) { setChoosenBlack(event.target.value); }

    let filterByCountry = sortedResorts.filter((item) => {
        if (choosenCountry !== "") {
            return item.location.country === choosenCountry;
        }
        else {
            return item;
        }
    });

    let filterByRating = filterByCountry.filter((item) => {
        if (choosenRating !== "") {
            return item.avgRating > choosenRating;
        } else {
            return item;
        }
    });

    let filterByBlue = filterByRating.filter((item) => {
        if (choosenBlue !== "") {
            return item.blueSlopes > choosenBlue;
        } else {
            return item;
        }
    });

    let filterByRed = filterByBlue.filter((item) => {
        if (choosenRed !== "") {
            return item.redSlopes > choosenRed;
        } else {
            return item;
        }
    });


    let filterByBlack = filterByRed.filter((item) => {
        if (choosenBlack !== "") {
            return item.blackSlopes > choosenBlack;
        } else {
            return item;
        }
    });

    // const sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    //   }

    // async function handleLocation() {
    //     navigator.geolocation.getCurrentPosition(async function(position){
    //         const lat = position.coords.latitude;
    //         const long = position.coords.longitude;
    //         console.log(lat);
    //         console.log(long);
    //         setUserLat(lat);
    //         setUserLong(long);
    //         sleep(5000).then(async() =>{
    //         console.log(userLat, userLong);
    //         const resortsWithDistance = await ResortService.getAllResortsWithGeo(lat, long);
    //         setResort_data(resortsWithDistance.data);
    //         console.log(resortsWithDistance);
    //         })
    //     });

    // }

    // function locationHelper(location) {
    //     setUserLat(location.coords.latitude)
    //     setUserLong(location.coords.longitude);
    //     console.log(userLat, userLong);
    // }

    return (<div>
        <Container id="filter-sort-container">
            <Row className="option-row">
                <Col xs={2}><h4>Sortuj po:</h4></Col>
                <Col xs={10}>
                    <Button className="filter-button" onClick={() => setSortedField('avgRating')}>Ocena</Button>
                    <Button className="filter-button" onClick={() => setSortedField('blueSlopes')}>Trasy niebieskie</Button>
                    <Button className="filter-button" onClick={() => setSortedField('redSlopes')}>Trasy czerwone</Button>
                    <Button className="filter-button" onClick={() => setSortedField('blackSlopes')}>Trasy czarne</Button>
                    <Button className="filter-button" onClick={() => setSortedField('distance')}>Lokalizacja</Button>
                </Col>
            </Row>

            <Row className="option-row">
                <Col xs={2}><h4>Filtruj: </h4></Col>
                <Col xs={10} className="row">
                    <table>
                        <thead>
                            <tr>
                                <th><h6 id="filter-label">Kraj</h6></th>
                                <th><h6 id="filter-label">Ocena</h6></th>
                                <th><h6 id="filter-label">Trasy niebieskie</h6></th>
                                <th><h6 id="filter-label">Trasy czerwone</h6></th>
                                <th><h6 id="filter-label">Trasy czarne</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select className="form-control" value={choosenCountry} onChange={updateSearchCountry.bind(this)}>
                                        <option value="">Dowolny</option>
                                        <option value="Poland">Polska</option>
                                        <option value="Czech Republic">Czechy</option>
                                        <option value="Slovakia">Słowacja</option>
                                    </select>
                                </td>
                                <td>
                                    <select className="form-control" value={choosenRating} onChange={updateSearchRating.bind(this)}>
                                        <option value="">Dowolna</option>
                                        <option value="2.5">Powyżej 2.5</option>
                                        <option value="3">Powyżej 3</option>
                                        <option value="3.5">Powyżej 3.5</option>
                                        <option value="4">Powyżej 4</option>
                                        <option value="4.5">Powyżej 4.5</option>
                                    </select>
                                </td>
                                <td>
                                    <select className="form-control" value={choosenBlue} onChange={updateSearchBlue.bind(this)}>
                                        <option value="">Dowolna ilość</option>
                                        <option value="3">Powyżej 3</option>
                                        <option value="5">Powyżej 5</option>
                                        <option value="10">Powyżej 10</option>
                                    </select>
                                </td>
                                <td>
                                    <select className="form-control" value={choosenRed} onChange={updateSearchRed.bind(this)}>
                                        <option value="">Dowolna ilość</option>
                                        <option value="3">Powyżej 3</option>
                                        <option value="5">Powyżej 5</option>
                                        <option value="10">Powyżej 10</option>
                                    </select>
                                </td>
                                <td>
                                    <select className="form-control" value={choosenBlack} onChange={updateSearchBlack.bind(this)}>
                                        <option value="">Dowolna ilość</option>
                                        <option value="3">Powyżej 3</option>
                                        <option value="5">Powyżej 5</option>
                                        <option value="10">Powyżej 10</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
        <CardGroup id="card-group">
            {filterByBlack.map(
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
                                Dystans: {resort.distance}
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