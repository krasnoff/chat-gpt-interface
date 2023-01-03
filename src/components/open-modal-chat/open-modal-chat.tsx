import { useState } from 'react';
import styles from './open-modal-chat.module.scss';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function OpenModalChatboxComponent() {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button 
                className={['btn btn-danger', styles.positionBottomRight, 'btn-circle btn-xl'].join(' ')}
                onClick={() => handleShow()}
                title="Open Chatbox"
                aria-label='Open Chatbox'
            >
                <i className={['bi bi-chat-dots', styles.iconLarge].join(' ')}></i>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OpenModalChatboxComponent;