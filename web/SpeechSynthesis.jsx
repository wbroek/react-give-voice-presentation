import {
  memo,
  useEffect,
  useState
} from 'react';

const SpeechSynthesis = (props) => {
  const { onEnd, children } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const supported = !!window.speechSynthesis;

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  useEffect(() => {
    if (supported) {
      getVoices();
    }
  }, []);

  const speak = (args = {}) => {
    const { voice = null, text = '' } = args;
    setSpeaking(true);
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voice;
    utterance.onend = handleEnd;
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return children({
    supported,
    speak,
    speaking,
    cancel,
    voices
  });
};

export default memo(SpeechSynthesis);
