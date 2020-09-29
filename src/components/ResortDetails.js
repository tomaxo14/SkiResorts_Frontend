import React from 'react';
import ResortService from '../services/resort-service';
import NavBar from './NavBar';
import '../styles/ResortDetails.css';

class ResortDetails extends React.Component {

    constructor(props){
        super(props);
        this.state={
            resort_details:[]
        }
    }

    async componentDidMount(){
        const resort = await ResortService.getResortById(this.props.match.params.id);
        this.setState({resort_details: resort.data});
        console.log(resort);
    }

    render(){
        return(
            <div>
            <NavBar></NavBar>    
            {this.state.resort_details.name}
            <img src={this.state.resort_details.skiMap} id="skiMap" width="400" height="306"></img>
            </div>
        )
}
        
    

}

export default ResortDetails;