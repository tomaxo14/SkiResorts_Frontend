import React from 'react';
import ResortService from '../services/resort-service.js';
import NavBar from './NavBar';
import Footer from './Footer';
import ResortsListElement from './ResortsListElement.js';
import '../styles/ResortList.css';

class ResortsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resorts_data: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        const resorts = await ResortService.getAllResorts();
        this.setState({ resorts_data: resorts.data, isLoaded: true });
        console.log(resorts);
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
                    <ResortsListElement resorts={this.state.resorts_data} />
                    <Footer></Footer>
                </div>
            )
        }
    }
}
export default ResortsList;