import { useState } from 'react';
import styles from './open-modal-chat.module.scss';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useSpeechRecognition } from 'react-speech-kit';


function OpenModalChatboxComponent() {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: any) => {
          setValue(result);
        },
    });
    
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
                <Modal.Body>
                    <Button variant="danger">
                        Record
                    </Button>
                </Modal.Body>
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