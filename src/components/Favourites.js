import React from 'react';
import { Button, Container } from 'react-bootstrap';
import NavBar from './NavBar';
import Footer from './Footer';
import ResortsListElement from './ResortsListElement.js';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import '../styles/Favourites.css'

class Favourites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // currentUser: undefined,
            favourites_data: [],
            isLoaded: false,
            userLat: 0,
            userLon: 0
        }
        this.helperFunction = this.helperFunction.bind(this);
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.helperFunction);
        this.sleep(500).then(async() => {
            const user = AuthService.getCurrentUser();
            var favourites = undefined;
            if (user !== undefined) {
                favourites = await UserService.getFavouritesWithGeo(this.state.userLat, this.state.userLon);
                this.setState({ favourites_data: favourites.data, isLoaded: true })
                console.log(this.state.favourites_data);
            }
        })
    }

    async helperFunction(position){
        const lat = await position.coords.latitude;
        const long = await position.coords.longitude;
        this.setState({userLat: lat, userLon: long});
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div>
                    <NavBar></NavBar>
                    <div className="ui segment">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader" id="loader">Ładowanie ulubionych</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <NavBar></NavBar>
                    {this.state.favourites_data.length===0 ? (
                        <div>
                        <Container id="not-logged-data">
                            <p className="paragraph"><i class="massive clipboard outline icon"></i></p>
                            <p className="paragraph"><h3>Nie dodałeś jeszcze ośrodków do ulubionych</h3></p>
                            <p className="paragraph"><a href="/osrodki"><Button className="button">Przejdź do ośrodków</Button></a></p>
                        </Container>
                        <div id="not-logged-footer"><Footer></Footer></div>
                        </div>
                    ):(
                        <div>
                        <Container id="favourites-info">
                            <h2>Twoje ulubione</h2>
                            <h5>Poniżej możesz zobaczyć wszystkie ośrodki, które dodałeś do ulubionych:</h5>
                        </Container>
                        <ResortsListElement resorts={this.state.favourites_data} />                
                        <div><Footer></Footer></div>
                        </div>
                    )}
                </div>
            )
        }

    }

}
export default Favourites;