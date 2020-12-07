import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Form from 'react-bootstrap/Form';
import {Button, Container, Row, Col} from 'react-bootstrap';
import '../styles/AdminForm.css';
import ResortService from '../services/resort-service';

class AdminForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            blue: 0,
            red: 0,
            black: 0,
            chairlifts: 0,
            gondolas: 0,
            tBars: 0,
            platters: 0,
            carpets: 0,
            snowpark: false,
            country: "Poland",
            latitude: 0,
            longitude: 0,
            website: "",
            resortId: props.location.resortId,
            resort_data: [],
            resort_location: []
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBlue = this.onChangeBlue.bind(this);
        this.onChangeRed = this.onChangeRed.bind(this);
        this.onChangeBlack = this.onChangeBlack.bind(this);
        this.onChangeChairlifts = this.onChangeChairlifts.bind(this);
        this.onChangeGondolas = this.onChangeGondolas.bind(this);
        this.onChangeTBars = this.onChangeTBars.bind(this);
        this.onChangePlatters = this.onChangePlatters.bind(this);
        this.onChangeCarpets = this.onChangeCarpets.bind(this);
        this.onChangeSnowpark = this.onChangeSnowpark.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        console.log(this.state.resortId);
        if(this.state.resortId!==undefined) {
            const resort = await ResortService.getResortById(this.state.resortId);
            console.log(resort);
            this.setState({resort_data: resort.data, resort_location: resort.data.location}, function(){
                this.setState({
                    name: this.state.resort_data.name,
                    blue: this.state.resort_data.blueSlopes,
                    red: this.state.resort_data.redSlopes,
                    black: this.state.resort_data.blackSlopes,
                    chairlifts: this.state.resort_data.chairlifts,
                    gondolas: this.state.resort_data.gondolas,
                    tBars: this.state.resort_data.tbars,
                    platters: this.state.resort_data.platters,
                    carpets: this.state.resort_data.carpets,
                    snowpark: this.state.resort_data.ifSnowPark,
                    country: this.state.resort_location.country,
                    latitude: this.state.resort_location.latitude,
                    longitude: this.state.resort_location.longitude
                })
                if(this.state.resort_data.website!==undefined){
                    this.setState({website: this.state.resort_data.website})
                }
            })
        }
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        });
        // console.log(this.state.name)
      }

    onChangeBlue(e) {
        this.setState({
          blue: e.target.value
        });
    }
    
    onChangeRed(e) {
        this.setState({
          red: e.target.value
        });
    }

    onChangeBlack(e) {
        this.setState({
          black: e.target.value
        });
    }

    onChangeChairlifts(e) {
        this.setState({
          chairlifts: e.target.value
        });
    }

    onChangeGondolas(e) {
        this.setState({
          gondolas: e.target.value
        });
    }

    onChangeTBars(e) {
        this.setState({
          tBars: e.target.value
        });
    }

    onChangePlatters(e) {
        this.setState({
          platters: e.target.value
        });
        // console.log(this.state.platters);
    }

    onChangeCarpets(e) {
        this.setState({
          carpets: e.target.value
        });
    }

    onChangeSnowpark(e) {
        this.setState({
          snowpark: e.target.value
        });  
    }

    onChangeCountry(e) {
        this.setState({
          country: e.target.value
        });  
        // console.log(this.state.country);
    }

    onChangeLatitude(e) {
        this.setState({
          latitude: e.target.value
        });  
    }
    
    onChangeLongitude(e) {
        this.setState({
          longitude: e.target.value
        });  
    }

    onChangeWebsite(e) {
        this.setState({
          website: e.target.value
        });  
    }

    onSubmit(event){
        event.preventDefault();
        if(this.state.resortId!==undefined){
            ResortService.editResort(this.state.resortId, this.state.name, this.state.blue, this.state.red, this.state.black, this.state.chairlifts, this.state.gondolas, this.state.tBars,
                this.state.platters, this.state.carpets, this.state.snowpark, this.state.country, this.state.latitude, this.state.longitude, this.state.website)
        } else {
            ResortService.addResort(this.state.name, this.state.blue, this.state.red, this.state.black, this.state.chairlifts, this.state.gondolas, this.state.tBars,
                this.state.platters, this.state.carpets, this.state.snowpark, this.state.country, this.state.latitude, this.state.longitude, this.state.website)
        }
    }

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Container>
                {this.state.resortId!==undefined ? (
                    <h3>Edytuj ośodek</h3>
                ):(
                    <h3>Dodaj nowy ośodek</h3>
                )
                }
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col>
                    <Form.Group>
                        <Form.Label>Nazwa ośrodka</Form.Label>
                        <Form.Control className="form-control-admin" type="text" onChange={this.onChangeName} value={this.state.name} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Liczba niebieskich tras</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeBlue} value={this.state.blue}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Liczba czerwonych tras</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeRed} value={this.state.red}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Liczba czarnych tras</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeBlack} value={this.state.black}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Liczba kanap</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeChairlifts} value={this.state.chairlifts}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Liczba gondol</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeGondolas} value={this.state.gondolas}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Liczba orczyków</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeTBars} value={this.state.tBars}/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                        <Form.Label>Liczba talerzyków</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangePlatters} value={this.state.platters}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Liczba taśm</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeCarpets} value={this.state.carpets}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Występowanie snowparku</Form.Label>
                        <Form.Control className="form-control-admin" as="select" onChange={this.onChangeSnowpark} value={this.state.snowpark}>
                            <option value={false}>Nie</option>
                            <option value={true}>Tak</option>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Kraj</Form.Label>
                        <Form.Control className="form-control-admin" as="select" onChange={this.onChangeCountry} value={this.state.country}>
                            <option value="Poland">Polska</option>
                            <option value="Czech Republic">Czechy</option>
                            <option value="Slovakia">Słowacja</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Szerokość geograficzna</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeLatitude} value={this.state.latitude}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Długość geograficzna</Form.Label>
                        <Form.Control className="form-control-admin" type="number" onChange={this.onChangeLongitude} value={this.state.longitude}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Strona internetowa</Form.Label>
                        <Form.Control className="form-control-admin" type="text" onChange={this.onChangeWebsite} value={this.state.website}/>
                    </Form.Group>

                    
                    </Col>
                    
                    </Row>
                    <div id="add-button-div">
                    {this.state.resortId!==undefined ? (
                        <Button id="add-button" variant="primary" type="submit" >
                        Edytuj ośrodek
                        </Button>
                    ):(
                        <Button id="add-button" variant="primary" type="submit" >
                        Dodaj ośrodek
                        </Button>
                    )}
                    </div>
                </Form>
                </Container>
                <Footer></Footer>
            </div>
        )
    }
}
export default AdminForm;