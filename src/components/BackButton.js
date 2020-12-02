import React from 'react';
import {Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";


function BackButton() {
    const history = useHistory();

        return (
            <div>
                <Button onClick={() => history.goBack()}>Wróć</Button>
            </div>
        )
}
export default BackButton;