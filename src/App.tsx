import './App.scss';
import OpenModalChatboxComponent from './components/open-modal-chat/open-modal-chat';
import './components/open-modal-chat/open-modal-chat.tsx'

import ReactGA from 'react-ga';
// import { useEffect } from 'react';
const TRACKING_ID = "G-SR1FRQMCDG"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  // useEffect(() => {
  //   document.querySelector("meta[name='description']")?.setAttribute("content", '');
  // }, []);
  
  return (
    <div className="main">
      <OpenModalChatboxComponent></OpenModalChatboxComponent>
      <div className="mainContent mt-3 px-4">
        <p>In today's world, technology has advanced to the point where we can interact with our devices in a more natural way. One of the most exciting advancements in this field is the ability to use voice commands to control our devices. A React component that allows a user to talk to the computer and the computer replies with a human voice is a perfect example of this technology in action.</p>
        <p>The AI behind this component is based on ChatGPT, a large language model trained by OpenAI. ChatGPT is capable of understanding and responding to a wide variety of natural language inputs, making it the perfect choice for this type of application.</p>
        <p>The voice recognition and voice synthesis used in this component are based on the SpeechSynthesis and SpeechRecognition controller interfaces, which are available on the latest version of Chrome and Firefox browsers. These interfaces allow the component to understand spoken commands and respond with a synthetic voice.</p>
        <p>The process of using this component is quite simple. A user can speak their command or question into the red microphone button above and the computer will respond with a human-like voice. The AI behind the component is able to understand the intent behind the user's command and provide an appropriate response.</p>
        <p>By pressing the configure icon on the SpeechSynthesis controller, the user can change the voice range and pitch.</p>
        <p>This component can be used in a wide variety of applications, such as virtual assistants, chatbots, and more. It's also a great tool for accessibility, as it allows users with disabilities to interact with their devices in a more natural way.</p>
        <p>In conclusion, the React component that allows a user to talk to the computer and the computer replies with a human voice is a powerful example of how technology is advancing to make our interactions with devices more natural. The AI behind the component, ChatGPT, is capable of understanding and responding to a wide variety of natural language inputs, and the use of SpeechSynthesis and SpeechRecognition controller interfaces allows for accurate voice recognition and synthesis. This component can be used in a wide variety of applications and has the potential to greatly improve accessibility for users with disabilities.</p>
      </div>
    </div>
  );
}

export default App;
