import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyModal = (props) => {

    return (
        <div>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{props.body}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary">Rozumiem</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}
export default MyModal;