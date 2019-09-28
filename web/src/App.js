import React, { useState } from 'react';
import { SpeechRecognition, SpeechSynthesis } from "react-speech-kit";

// const Example = () => {
//   const [value, setValue] = useState('');

//   const onResult = (result) => {
//     setValue(result);
//   };

//   return (
//       <div style={{margin: 20}}>
//         <h2>Speech Recognition</h2>
//         <SpeechRecognition
//           onResult={onResult}
//         >
//           {({
//             listen,
//             listening,
//             stop,
//             supported
//           }) => {
//             // Guard against unsupported browser first
//             if (!supported) {
//               return <p>Oh no, it looks like your browser doesn&#39;t support Speech Recognition.</p>;
//             }

//             const toggle = listening
//               ? stop
//               : () => listen('en-US');

//             return (
//               <>
//                 <textarea
//                   value={value}
//                   rows={10}
//                   cols={50}
//                   disabled
//                 />
//                 <br />
//                 <button type="button" onClick={toggle}>
//                   {listening ? 'Stop' : 'Listen'}
//                 </button>
//               </>
//             );
//           }}
//         </SpeechRecognition>
//       </div>
//   );
// };

// export default Example;




const Example = ({ onEnd }) => {
  const [text, setText] = useState('React Alicante has the greatest venue');

  return (
      <div style={{margin: 10}}>
        <h2>Speech Synthesis</h2>
        <SpeechSynthesis onEnd={onEnd}>
          {({
            speak,
            cancel,
            speaking,
            supported,
            voices
          }) => {
            if (!supported) {
              return <p>Oh no, it looks like your browser doesn&#39;t support Speech Synthesis.</p>;
            }

            // Magic number??!
            const voice = voices[49]

            return (
              <>
                <textarea
                  rows={10}
                  cols={50}
                  value={text}
                  onChange={(event) => { setText(event.target.value); }}
                />
                <br />
                { speaking
                  ? (
                    <button type="button" onClick={cancel}>
                      Stop
                    </button>
                  ) : (
                    <button type="button" onClick={() => speak({ text, voice })}>
                      Speak
                    </button>
                  )
                }
              </>
            );
          }}
        </SpeechSynthesis>
      </div>
  );
};

export default Example;