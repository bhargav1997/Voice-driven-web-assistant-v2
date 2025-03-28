import React, { useState, useEffect, useCallback } from "react";
import { Mic, MicOff, Settings as SettingsIcon } from "lucide-react";
import Settings from "./Settings";

interface VoiceControlProps {
   onCommand: (command: string) => void;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ onCommand }) => {
   const [isListening, setIsListening] = useState(false);
   const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
   const [isSettingsOpen, setIsSettingsOpen] = useState(false);

   useEffect(() => {
      if ("webkitSpeechRecognition" in window) {
         const recognition = new (window as any).webkitSpeechRecognition();
         recognition.continuous = true;
         recognition.interimResults = true;

         recognition.onresult = (event: SpeechRecognitionEvent) => {
            const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("command" + command);
            if (event.results[event.results.length - 1].isFinal) {
               onCommand(command);
            }
         };

         recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
         };

         setRecognition(recognition);
      }
   }, [onCommand]);

   const toggleListening = useCallback(() => {
      if (!recognition) return;

      if (isListening) {
         recognition.stop();
      } else {
         recognition.start();
      }
      setIsListening(!isListening);
   }, [isListening, recognition]);

   return (
      <>
         <div className='fixed bottom-4 right-4 flex items-center gap-2'>
            <button
               onClick={toggleListening}
               className={`p-4 rounded-full shadow-lg transition-all ${
                  isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
               }`}
               title={isListening ? "Stop listening" : "Start listening"}>
               {isListening ? <MicOff className='w-6 h-6 text-white' /> : <Mic className='w-6 h-6 text-white' />}
            </button>
            <button
               onClick={() => setIsSettingsOpen(true)}
               className='p-4 rounded-full shadow-lg bg-gray-100 hover:bg-gray-200'
               title='Settings'>
               <SettingsIcon className='w-6 h-6 text-gray-600' />
            </button>
         </div>

         <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </>
   );
};

export default VoiceControl;
