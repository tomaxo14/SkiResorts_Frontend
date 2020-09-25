import React from 'react';
import { Navbar } from 'react-bootstrap';
import ResortService from '../services/resort-service.js';
import NavBar from './NavBar';
import Footer from './Footer';
import ResortsListElement from './ResortsListElement.js';

class ResortsList extends React.Component {

    constructor(props){
        super(props);
        this.state={
            resorts_data:[]
        }
    }

    async componentDidMount(){
        const resorts = await ResortService.getAllResorts();
        this.setState({resorts_data: resorts.data});
        console.log(resorts);
    }
    

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <ResortsListElement resorts={this.state.resorts_data} />
                <Footer></Footer>
            </div>
        )
    }
}
export default ResortsList;