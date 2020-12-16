import React from 'react';
import { Card, Button, Container, Row, Col, CardDeck } from 'react-bootstrap';
import '../styles/ResortsListElement.css';
import { Link } from 'react-router-dom';

const ResortsListElement = (props) => {

    const resorts_data = props.resorts;
    function polishCountryName(countryName) {
        if (countryName === "Poland") return "Polska"
        if (countryName === "Czech Republic") return "Czechy"
        if (countryName === "Slovakia") return "Słowacja"
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

    function truncate(value) {
        return Math.floor(value * 10) / 10;
    }
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
                <Col xs={6} md={2} id="sorted-label-col"><h4>Sortuj po:</h4></Col>
                <Col xs={10}>
                    <Button className="filter-button" onClick={() => setSortedField('avgRating')}>Ocena</Button>
                    <Button className="filter-button" onClick={() => setSortedField('blueSlopes')}>Trasy niebieskie</Button>
                    <Button className="filter-button" onClick={() => setSortedField('redSlopes')}>Trasy czerwone</Button>
                    <Button className="filter-button" onClick={() => setSortedField('blackSlopes')}>Trasy czarne</Button>
                    <Button className="filter-button" onClick={() => setSortedField('distance')}>Lokalizacja</Button>
                </Col>
            </Row>

            <Row className="option-row" id="filter-row">
                <Col xs={6} md={2}><h4>Filtruj: </h4></Col>
                {/* <Col xs={10} className="row">
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
                </Col> */}
                <Col xs={10} className="row">

                                <Col xs={6} md={2} id="filter-col">
                                <h6 id="filter-label">Kraj</h6>
                                <select className="form-control" value={choosenCountry} onChange={updateSearchCountry.bind(this)}>
                                        <option value="">Dowolny</option>
                                        <option value="Poland">Polska</option>
                                        <option value="Czech Republic">Czechy</option>
                                        <option value="Slovakia">Słowacja</option>
                                    </select>
                                </Col>
                                <Col xs={6} md={2} id="filter-col">
                                <h6 id="filter-label">Ocena</h6>
                                <select className="form-control" value={choosenRating} onChange={updateSearchRating.bind(this)}>
                                        <option value="">Dowolna</option>
                                        <option value="2.5">Powyżej 2.5</option>
                                        <option value="3">Powyżej 3</option>
                                        <option value="3.5">Powyżej 3.5</option>
                                        <option value="4">Powyżej 4</option>
                                        <option value="4.5">Powyżej 4.5</option>
                                    </select>
                                </Col>
                                <Col xs={6} md={2} id="filter-col">
                                <h6 id="filter-label">Trasy niebieskie</h6>
                                <select className="form-control" value={choosenBlue} onChange={updateSearchBlue.bind(this)}>
                                        <option value="">Dowolna ilość</option>
                                        <option value="3">Powyżej 3</option>
                                        <option value="5">Powyżej 5</option>
                                        <option value="10">Powyżej 10</option>
                                    </select>
                                </Col>
                                <Col xs={6} md={2} id="filter-col">
                                <h6 id="filter-label">Trasy czerwone</h6>
                                <select className="form-control" value={choosenRed} onChange={updateSearchRed.bind(this)}>
                                        <option value="">Dowolna ilość</option>
                                        <option value="3">Powyżej 3</option>
                                        <option value="5">Powyżej 5</option>
                                        <option value="10">Powyżej 10</option>
                                    </select>
                                </Col>
                                <Col xs={7} md={2} id="filter-col">
                                <h6 id="filter-label">Trasy czarne</h6>
                                <select className="form-control" value={choosenBlack} onChange={updateSearchBlack.bind(this)}>
                                        <option value="">Dowolna ilość</option>
                                        <option value="3">Powyżej 3</option>
                                        <option value="5">Powyżej 5</option>
                                        <option value="10">Powyżej 10</option>
                                    </select>
                                </Col>               
                </Col>
            </Row>
        </Container>
        <div className="container-fluid">
        <div className="row">
        <CardDeck  id="card-columns" className="CardDeck  col-lg-12 col-xs-10">
            {filterByBlack.map(
                resort => (
                    <div key={resort.resortId}>
                        <Card style={{ width: '30rem' }} className="card" >

                            <Card.Body >

                                <Card.Title>{resort.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {polishCountryName(resort.location.country)}
                                </Card.Subtitle>
                                <div className="row ">
                                    <div className="col-md-6 col-xs-10">
                                        <br></br>
                                        <Card.Text>
                                            <i>Ocena użytkowników</i>
                                            <br></br>
                                            <span id="rating-value">
                                                <i className="star icon"></i>
                                                {resort.avgRating.toFixed(1)}
                                            </span>
                                        </Card.Text>
                                    </div>
                                    <div className="col-md-6 col-xs-10">
                                    <br></br>
                                        <Card.Text>
                                            <i className="circle icon" id="blue-circle"></i>
                                Trasy niebieskie: <b>{resort.blueSlopes}</b>
                                            <br></br>
                                            <i className="circle icon" id="red-circle"></i>
                                Trasy czerwone: <b>{resort.redSlopes}</b>
                                            <br></br>
                                            <i className="circle icon"></i>
                                Trasy czarne: <b>{resort.blackSlopes}</b>
                                        </Card.Text>
                                    </div>
                                {props.userLat!==0 && props.userLon!==0 ? (
                                <div id="distance-div">
                                <i className="map marker alternate icon"></i>
                                Dystans od Twojej lokalizacji: <b>{truncate(resort.distance)} km</b>
                                </div>
                                ) : (
                                < div id="distance-div">
                                <i className="map marker alternate icon"></i>
                                Zezwól na dostęp do Twojej lokalizacji i odśwież stronę aby zobaczyć dystans do ośrodka
                                </div>
                                )} 
                                </div>
                                <div id="button-div">
                                    <Link to={"/osrodek/" + resort.resortId}><Button className="card-button" id="more-button">Więcej</Button></Link>
                                    {props.admin ? (
                                        <Link to={{
                                            pathname: '/admin',
                                            resortId:  resort.resortId
                                        }}><Button className="card-button">Edytuj</Button></Link>
                                    ):(
                                        <span></span>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                )
            )
            }
        </CardDeck >
        </div>
        </div>
    </div>
    )
}
export default ResortsListElement;