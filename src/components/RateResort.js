import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserService from '../services/user.service';
import authHeader from '../services/auth-header';
import MyModal from './MyModal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import '../styles/RateResort.css';


const RateResort = (props) =>  {

    const [value, setValue] = React.useState(2);
    const [message, setMessage] = React.useState();
    const API_URL_BASIC = `http://localhost:8080/`;

    function onInputChange(event) {
        setMessage(event.target.value);
        console.log(message);
    }

    function onSubmit() {
        UserService.rateResort(props.resortId, value, message);
    //     console.log("Kliknieto submit");
    //     axios.post(API_URL_BASIC + `rateResort?resortId=` + props.resortId + `&value=` + value + `&message=` + message, {headers: authHeader()})
    // .then(res => {
    //   console.log(res);

    //   let options = {
    //     method: 'POST',
    //     headers : authHeader()
    //     };
    //     let url = API_URL_BASIC + `rateResort?resortId=` + props.resortId + `&value=` + value + `&message=` + message;

    //     fetch(url,options).then(res => console.log(res));
        return (<MyModal title="Powiadomienie" body="test"></MyModal>)
    }

    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Oceń ośrodek</Typography>
                <Rating
                    name="simple-controlled"
                    size="large"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                />
            </Box>
            <textarea rows="5" cols="50" onChange={onInputChange} placeholder="Oprócz oceny możesz dodać opinię" id="opinion">
            </textarea>
            {message == '' || message == undefined ? (
                <Button onClick={onSubmit} id="rate-button">Zapisz ocenę</Button>
            ) : (
                <Button onClick={onSubmit}>Zapisz ocenę i opinię</Button>
            )}

        </div>
    
    )
}
export default RateResort;