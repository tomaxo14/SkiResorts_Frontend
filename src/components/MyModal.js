import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class MyModal extends React.Component {


    render(){
    return (
        <div>
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.props.body}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button id="ok-button" variant="primary" onClick={() => {this.props.onHide()}}>Rozumiem</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    }
}
export default MyModal;