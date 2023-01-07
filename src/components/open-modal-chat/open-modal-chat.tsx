import { useState } from 'react';
import styles from './open-modal-chat.module.scss';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useSpeechRecognition } from 'react-speech-kit';
import useSpeechSynthesis  from './hooks/useSpeechSynthesis';
import { SpeakArguments } from './interfaces/SpeakArguments';


function OpenModalChatboxComponent() {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: any) => {
          setValue(result);
        },
        onEnd: () => {
            console.log('on end: ', value);
        }
    });
    const { speak } = useSpeechSynthesis();
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const endHandler = (evt: SpeechSynthesisEvent) => {
        console.log('endHandler', evt)
    }

    const speakHandler = () => {
        const voiceArray: Array<SpeechSynthesisVoice> = window.speechSynthesis.getVoices();
        // console.log(window.speechSynthesis.getVoices());
        
        const speakArgs: SpeakArguments = {
            text: "I am a robot",
            voice: voiceArray[5],
            onend: endHandler,
            rate: 1,
            pitch: 1,
            volume: 10
        }

        speak(speakArgs);
    }

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
                    <div className='d-flex'>
                        <div>
                            <Button variant="danger" onMouseDown={listen} onMouseUp={stop} className={['btn btn-danger', 'btn-circle btn-xl'].join(' ')}>
                                <i className={['bi bi-mic-fill', styles.iconLarge].join(' ')}></i>
                            </Button>
                            {listening && <div>Go ahead I'm listening</div>}
                        </div>
                        <div>
                            <Button variant="Success" onClick={() => speakHandler()} className={['btn btn-success', 'btn-circle btn-xl'].join(' ')}>
                                <i className={['bi bi-volume-up-fill', styles.iconLarge].join(' ')}></i>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
                
            </Modal>
        </>
    );
}

export default OpenModalChatboxComponent;