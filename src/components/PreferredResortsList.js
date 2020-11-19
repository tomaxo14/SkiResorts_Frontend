import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import ResortService from '../services/resort-service';
import PreferredResortsListElement from './PreferredResortsListElement';

class PreferredResortsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blue: this.props.location.blue,
            red: this.props.location.red,
            black: this.props.location.black,
            snowPark: this.props.location.snowPark,
            location: this.props.location.location,
            isLoaded: false,
            resortsWithPoints: []
        }
    }

    async componentDidMount() {
        console.log(this.state.blue);
        const preferredResorts = await ResortService.getPreferredResorts(this.state.blue, this.state.red, this.state.black,
            this.state.snowPark, this.state.location);
        this.setState({isLoaded: true, resortsWithPoints: preferredResorts});
        console.log(preferredResorts);
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div>
                    <NavBar></NavBar>
                    <div className="ui segment">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader" id="loader">Ładowanie</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <NavBar></NavBar>
                    <PreferredResortsListElement resortsWithPoints = {this.state.resortsWithPoints}></PreferredResortsListElement>
                    <Footer></Footer>
                </div>
            )
        }
    }
}
export default PreferredResortsList;