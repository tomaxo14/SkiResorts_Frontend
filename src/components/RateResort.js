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
    const [show, setShow] = React.useState(false);

    function onInputChange(event) {
        setMessage(event.target.value);
        console.log(message);
    }

    function onSubmit() {
        if (props.user!==undefined) {
            UserService.rateResort(props.resortId, value, message);
            setShow(true);
        }
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
    // return(
    //     <div>
    //     <MyModal title="Powiadomienie" body="test"></MyModal>
    //     </div>
    // )
    }

    function modalClose() {
        setShow(false);
        afterRate();
    }

    function afterRate() {
        props.afterRate();
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
            {props.user===undefined || props.user===null ? (
                <Button href="/logowanie" id="rate-button">Zaloguj się aby wystawić ocenę</Button>
            ) : (
                <div>
                {message == '' || message == undefined ? (
                <div>
                    <Button onClick={onSubmit} id="rate-button">Zapisz ocenę</Button>
                    <MyModal title="Powiadomienie" body="Dodano ocenę" show={show} onHide={modalClose}  />
                </div>
                ) : (
                    <div>
                        <Button onClick={onSubmit}>Zapisz ocenę i opinię</Button>
                        <MyModal title="Powiadomienie" body="Dodano ocenę i opinię" show={show} onHide={modalClose}  />
                    </div>
            )}
            </div>
            )
            }
            

        </div>
    
    )
}
export default RateResort;