import React from 'react';
import { Button, Container, Card, CardGroup } from 'react-bootstrap';
import '../styles/ResortsListElement.css';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import '../styles/Ratings.css'

class Ratings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ratings_data: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        const user = AuthService.getCurrentUser();
        var ratings = undefined;
        if (user != undefined) {
            ratings = await UserService.yourRatings();
            this.setState({ ratings_data: ratings.data, isLoaded: true })
            console.log(this.state.ratings_data);
        }
    }

    formatDate(date) {
        return (
            new Intl.DateTimeFormat("en-GB").format(Date.parse(date))
        )
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div>
                    <NavBar></NavBar>
                    <div className="ui segment">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader" id="loader">Ładowanie Twoich ocen</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <NavBar></NavBar>
                    {this.state.ratings_data.length === 0 ? (
                        <div>
                            <Container id="not-logged-data">
                                <p className="paragraph"><i class="massive clipboard outline icon"></i></p>
                                <p className="paragraph"><h3>Nie oceniłeś jeszcze żadnego ośrodka</h3></p>
                                <p className="paragraph"><a href="/osrodki"><Button className="button">Przejdź do ośrodków</Button></a></p>
                            </Container>
                            <div id="not-logged-footer"><Footer></Footer></div>
                        </div>
                    ) : (
                            <div>
                                <Container id="ratings-info">
                                    <h2>Twoje oceny</h2>
                                    <h5>Poniżej masz możliwość wglądu do wszystkich ocen jakie wystawiłeś:</h5>
                                </Container>
                                <CardGroup id="card-group">
                                    {this.state.ratings_data.map(
                                        rating => (
                                            <div key={rating.ratingId}>
                                                <Card style={{ width: '30rem', minHeight:'22rem'}} className="card">

                                                    <Card.Body >

                                                        <Card.Title id="ratings-title">{rating.resortName}</Card.Title>
                                                        <Card.Subtitle>
                                                            Data wystawienia:&nbsp;
                                                            {this.formatDate(rating.date)}</Card.Subtitle>
                                                        <div>
                                                            
                                                            <br></br>
                                                            <Card.Text>

                                                                <h4>
                                                                    <i className="star icon"></i>
                                                                    Twoja ocena: &nbsp;
                                                                    {rating.value}
                                                                </h4>
                                                                <h6 id="message-text">
                                                                    <i>{rating.message}</i>
                                                                </h6>
                                                                
                                                            </Card.Text>
                                                            
                                                            
                                                        </div>
                                                        <div id="details-button-div">
                                                            <Link to={"/osrodek/" + rating.resort}><Button className="card-button">Szczegóły ośrodka</Button></Link>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        )
                                    )}
                                </CardGroup>
                                
                                <div id="logged-footer"><Footer></Footer></div>
                            </div>
                        )}
                </div>
            )
        }
    }
}
export default Ratings