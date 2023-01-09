import { useCallback, useEffect, useState } from 'react';
import { SpeakArguments } from '../interfaces/SpeakArguments';

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice> | null>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const getVoices = useCallback(() => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true);
      getVoices();
    }
  }, [getVoices]);

  useEffect(() => {
    if (voices && voices.length > 0) {
      setSelectedVoice(voices[0])
    }
  }, [voices]);

  const speak = (args: SpeakArguments) => {
    if (!supported) return;
    setSpeaking(true);
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = args.text;
    utterance.voice = args.voice ? args.voice : selectedVoice;
    utterance.onend = args.onend ? args.onend : null;
    utterance.rate = args.rate ? args.rate : 1;
    utterance.pitch = args.pitch ? args.pitch : 1;
    utterance.volume = args.volume ? args.volume : 10;
    utterance.onboundary = args.onboundary ? args.onboundary : null;
    utterance.onerror = args.onerror ? args.onerror : null;
    utterance.onmark = args.onmark ? args.onmark : null;
    utterance.onpause = args.onpause ? args.onpause : null;
    utterance.onresume = args.onresume ? args.onresume : null;
    utterance.onstart = args.onstart ? args.onstart : null;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return {
    supported,
    speak,
    speaking,
    cancel,
    voices,
    setSelectedVoice,
    selectedVoice
  };
};

export default useSpeechSynthesis;