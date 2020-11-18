import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import ResortService from '../services/resort-service'

class PreferredResortsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blue: this.props.location.blue,
            red: this.props.location.red,
            black: this.props.location.black,
            snowPark: this.props.location.snowPark,
            location: this.props.location.location
        }
    }

    async componentDidMount() {
        console.log(this.state.blue);
        const preferredResorts = await ResortService.getPreferredResorts(this.state.blue, this.state.red, this.state.black,
            this.state.snowPark, this.state.location);
       console.log(preferredResorts);
    }

    render() {
        return (
            <div>
            <NavBar></NavBar>
            <Footer></Footer>
            </div>
        )
    }
}
export default PreferredResortsList;