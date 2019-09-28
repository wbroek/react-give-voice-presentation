import {
  memo,
  useRef,
  useEffect,
  useState
} from 'react';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechRekognition = (props) => {
  const recognition = useRef(null);
  const [listening, setListening] = useState(false);
  const supported = !!window.SpeechRecognition;
  const {
    children,
    onEnd,
    onResult
  } = props;

  const processResult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    onResult(transcript);
  };

  const listen = (args = {}) => {
    if (listening) return;
    const {
      lang = '',
      interimResults = true
    } = args;
    setListening(true);
    recognition.current.lang = lang;
    recognition.current.interimResults = interimResults;
    recognition.current.onresult = processResult;
    // REPEAT?
    recognition.current.onend = () => recognition.current.start();
    recognition.current.start();
  };

  const stop = () => {
    if (!listening) return;
    setListening(false);
    recognition.current.onend = () => {};
    recognition.current.stop();
    onEnd();
  };

  useEffect(() => {
    if (!supported) return;
    recognition.current = new window.SpeechRecognition();
  }, []);

  return children({
    listen,
    listening,
    stop,
    supported
  });
};

export default memo(SpeechRekognition);
