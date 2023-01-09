import { useEffect, useState } from 'react';
import styles from './open-modal-chat.module.scss';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import useSpeechSynthesis  from './hooks/useSpeechSynthesis';
import { SpeakArguments } from './interfaces/SpeakArguments';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import { ChatGPTResultObj } from './interfaces/chatGPTResultObj';


function OpenModalChatboxComponent() {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    // const [endFlag, setEndFlag] = useState(false);
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: any) => {
          setValue(result);
        },
        onEnd: async () => {
            const res = await fetchData(value);
            const res2 = parseAnswer(res);
            speakHandler(res2);
        }
    });
    const { speak, voices, setSelectedVoice } = useSpeechSynthesis();

    const fetchData = async (searchString: Object) => {
        try {
            // const REACT_APP_SERVER_BASE_URL = 
            const res = await fetch(`https://tame-blue-indri-veil.cyclic.app/`, {
                method: 'POST',
                body: JSON.stringify(searchString)
            });
            const json = await res.json();
            // console.log('json: ', json);
            return json;
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const parseAnswer = (res: ChatGPTResultObj) => {
        //console.log('parseAnswer', res);
        let result: string = '';
        
        if (res && res.choices) {
            const choices = res.choices;
            choices.forEach(el => {
                let str = el.text;
                str = str.replace(/(\r\n|\n|\r)/gm, "")
                result = result.concat(str);
            });
        }
        
        return result;
    }
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initiateStop = () => {
        setTimeout(() => {
            stop();
        }, 1000)
    }

    useEffect(() => {
        if (voices && voices.length > 0) {
          setSelectedVoice(voices[5])
        }
    }, [voices, setSelectedVoice]);

    const speakHandler = (str: string) => {
        const speakArgs: SpeakArguments = {
            text: str
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
                            <Button variant="danger" onMouseDown={listen} onMouseUp={initiateStop} className={['btn btn-danger', 'btn-circle btn-xl'].join(' ')}>
                                <i className={['bi bi-mic-fill', styles.iconLarge].join(' ')}></i>
                            </Button>
                            {listening && <div>Go ahead I'm listening</div>}
                        </div>
                        <div>
                            <Button variant="Success" onClick={() => speakHandler('I am a robot')} className={['btn btn-success', 'btn-circle btn-xl'].join(' ')}>
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