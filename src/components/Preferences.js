import React from 'react';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Container, Button} from 'react-bootstrap';
import Footer from './Footer';
import NavBar from './NavBar';
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
            location: 3
        }
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        this.setState({ currentUser: user })
    }

    onSaveClick() {
        console.log(this.state.blue, this.state.red, this.state.black, this.state.snowPark, this.state.location)
        UserService.addPreferences(this.state.blue, this.state.red, this.state.black, this.state.snowPark, this.state.location);
    }

    render() {
        return (
            <div>
            <NavBar></NavBar>
            <Container className="container">
                <h2>Zaznacz jak ważna jest dla Ciebie każda z poniższych cech ośrodka. Następnie my zarekomendujemy ośrodki spełniające Twoje wymagania</h2>
                <Typography id="discrete-slider" gutterBottom>
                    <b>Liczba tras niebieskich</b>
                </Typography>
                <Slider
                    className="slider"
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks = {marks}
                    min={1}
                    max={5}
                    onChange={(e, value) => this.setState({blue: value})}
                />
                <Typography id="discrete-slider" gutterBottom>
                <b> Liczba tras czerwonych</b>
                </Typography>
                <Slider
                    className="slider"
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks = {marks}
                    min={1}
                    max={5}
                    onChange={(e, value) => this.setState({red: value})}
                />
                <Typography id="discrete-slider" gutterBottom>
                <b>Liczba tras czarnych</b>
                </Typography>
                <Slider
                    className="slider"
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks = {marks}
                    min={1}
                    max={5}
                    onChange={(e, value) => this.setState({black: value})}
                />
                <Typography id="discrete-slider" gutterBottom>
                    <b>Występowanie snowparku</b>
                </Typography>
                <Slider
                    className="slider"
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks = {marks}
                    min={1}
                    max={5}
                    onChange={(e, value) => this.setState({snowPark: value})}
                />
                <Typography id="discrete-slider" gutterBottom>
                    <b>Odległość od Twojej lokalizacji</b>
                </Typography>
                <Slider
                    className="slider"
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks = {marks}
                    min={1}
                    max={5}
                    onChange={(e, value) => this.setState({location: value})}
                />
                <Button onClick={this.onSaveClick}>Zapisz preferencje</Button>
            </Container>
            <Footer></Footer>
            </div>
        )
    }

}
export default Preferences;