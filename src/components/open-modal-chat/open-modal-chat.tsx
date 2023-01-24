import { useEffect, useState } from 'react';
import styles from './open-modal-chat.module.scss';
import Spinner from 'react-bootstrap/Spinner';
import useSpeechSynthesis  from './hooks/useSpeechSynthesis';
import { SpeakArguments } from './interfaces/SpeakArguments';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import { ChatGPTResultObj } from './interfaces/chatGPTResultObj';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISpeechSynthesisConf {
    voice?: string;
    rate: number;
    pitch: number;
    volume: number;
}

function OpenModalChatboxComponent() {
    const [show, setShow] = useState(false);
    const [resultValue, setResultValue] = useState('');
    const [isListening, setIsListening] = useState<boolean>(false);
    const [currentSpeechSynthesis, setCurrentSpeechSynthesis] = useState<ISpeechSynthesisConf>()

    const { register, handleSubmit, watch, setValue } = useForm<ISpeechSynthesisConf>();
    const onSubmit: SubmitHandler<ISpeechSynthesisConf> = data => {
        localStorage.setItem('speechSynthesis', JSON.stringify(data));
        setCurrentSpeechSynthesis(data);
        handleClose();
    };
    
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: any) => {
            setResultValue(result);
        },
        onEnd: async () => {
            const res = await fetchData(resultValue);
            const res2 = parseAnswer(res);
            speakHandler(res2);
            setIsListening(false);
        }
    });
    const { speak } = useSpeechSynthesis();

    const fetchData = async (searchString: Object) => {
        try {
            // const REACT_APP_SERVER_BASE_URL = 
            const res = await fetch(`https://tame-blue-indri-veil.cyclic.app/`, {
                method: 'POST',
                body: JSON.stringify(searchString),
                headers: {
                    // 'Content-Type': 'application/json'
                },
            });
            const json = await res.json();
            return json;
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const parseAnswer = (res: ChatGPTResultObj) => {
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
        setIsListening(true);
        setTimeout(() => {
            stop();
        }, 1000)
    }

     useEffect(() => {
        if (localStorage.getItem("speechSynthesis") === null) {
             const speechSynthesis: ISpeechSynthesisConf = {
                rate: 1,
                pitch: 1,
                volume: 1
            }
            localStorage.setItem('speechSynthesis', JSON.stringify(speechSynthesis))
            setCurrentSpeechSynthesis(speechSynthesis);
        } else {
            const speechSynthesis: ISpeechSynthesisConf = JSON.parse(localStorage.getItem("speechSynthesis") as string);
            setCurrentSpeechSynthesis(speechSynthesis);
        }
    }, []);

    

    // TODO
    // initial default values if you dont have any values in localhost
    // apply these setting to speech synthesis

    const speakHandler = (str: string) => {
        const voicesList = window.speechSynthesis.getVoices()
        let selectedVoice;

        if (currentSpeechSynthesis?.voice) {
            selectedVoice = voicesList.find(el => el.name === currentSpeechSynthesis?.voice);
        }
        
        const speakArgs: SpeakArguments = {
            text: str,
            rate: currentSpeechSynthesis?.rate,
            pitch: currentSpeechSynthesis?.pitch,
            volume: currentSpeechSynthesis?.volume,
            voice: selectedVoice
        }

        speak(speakArgs);
    }

    const onShowHandler = () => {
        if (currentSpeechSynthesis) {
            setValue('rate', currentSpeechSynthesis?.rate);
            setValue('pitch', currentSpeechSynthesis?.pitch);
            setValue('volume', currentSpeechSynthesis?.volume);

            if (currentSpeechSynthesis?.voice) {
                setValue('voice', currentSpeechSynthesis?.voice);
            }
        }
        
    }

    return (
        <>
            <div className={styles.buttonSection}>
                <div className={styles.innerDiv}>
                    <Button variant="danger"  onMouseDown={listen} onMouseUp={initiateStop} className={['btn btn-danger', 'btn-circle btn-xl'].join(' ')} disabled={isListening}>
                        {!isListening ? <i className={['bi bi-mic-fill', styles.iconLarge].join(' ')}></i> : null}
                        {isListening ? 
                            <Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                            />
                        : null}
                    </Button>
                    {listening && <div>Go ahead I'm listening</div>}
                    <div 
                        className={styles.configuration} 
                        title="Configuration" 
                        onClick={() => handleShow()}>
                            <i className="bi bi-gear-fill"></i>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} onShow={() => onShowHandler()}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                <Modal.Title>Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="voice" className="form-label">Choose voice</label>
                        <Form.Select aria-label="Default select example" {...register("voice")}>
                            {window.speechSynthesis.getVoices().map((el, index) => 
                                <option value={el.name} key={index}>{el.name}</option>
                            )}
                        </Form.Select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rate" className="form-label">Rate</label> ({ watch('rate') })
                        <input type="range" className="form-range" min="0.5" max="2" step="0.1" {...register("rate")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pitch" className="form-label">Pitch</label> ({ watch('pitch') })
                        <input type="range" className="form-range" min="0" max="2" step="0.1" {...register("pitch")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="volume" className="form-label">Volume</label> ({ watch('volume') })
                        <input type="range" className="form-range" min="0" max="1" step="0.1" {...register("volume")} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => handleClose()}>Cancel</Button>
                    <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default OpenModalChatboxComponent;

// TODO
// 1. verify browser - mobile or desktop
// 2. desktop mode: set dedicated functions to mousedown and mouse up. neutrolize click event
// 3. neutrolize mousedown and mouse up - click event set dedicated function
// 4. instead of Go ahead I'm listening - display Press button again when you are done