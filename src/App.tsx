import { useState } from "react";
import VoiceControl from "./components/VoiceControl";
import CommandFeedback from "./components/CommandFeedback";
import { useVoiceCommands } from "./hooks/useVoiceCommands";
import { Brain, Navigation, FormInput } from "lucide-react";
import Footer from "./components/Footer";
import "./styles/main.css";

function App() {
   const [currentCommand, setCurrentCommand] = useState("");
   const [isProcessing, setIsProcessing] = useState(false);
   const { handleCommand } = useVoiceCommands();

   const onCommand = (command: string) => {
      setCurrentCommand(command);
      setIsProcessing(true);

      // Process command
      handleCommand(command);

      // Reset feedback after delay
      setTimeout(() => {
         setIsProcessing(false);
         setCurrentCommand("");
      }, 2000);
   };

   return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
         <div className='container mx-auto px-4 py-12'>
            <div className='text-center mb-12'>
               <h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4'>
                  Voice-Driven Web Assistant
               </h1>
               <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                  Navigate, control, and interact with websites using natural voice commands. Powered by advanced AI for seamless web
                  accessibility.
               </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
               <div className='bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300'>
                  <div className='flex items-center gap-3 mb-6'>
                     <div className='p-3 bg-blue-100 rounded-lg'>
                        <Navigation className='w-6 h-6 text-blue-600' />
                     </div>
                     <h2 className='text-2xl font-semibold text-gray-800'>Navigation</h2>
                  </div>
                  <ul className='space-y-3 text-gray-600'>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                        "Scroll up/down" - Smooth scrolling
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                        "Next/Previous section" - Navigate sections
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                        "Go to top/bottom" - Quick navigation
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                        "Click [button text]" - Interactive clicking
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                        "Go back/forward" - Browser history
                     </li>
                  </ul>
               </div>

               <div className='bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300'>
                  <div className='flex items-center gap-3 mb-6'>
                     <div className='p-3 bg-indigo-100 rounded-lg'>
                        <FormInput className='w-6 h-6 text-indigo-600' />
                     </div>
                     <h2 className='text-2xl font-semibold text-gray-800'>Form Control</h2>
                  </div>
                  <ul className='space-y-3 text-gray-600'>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-indigo-400 rounded-full'></span>
                        "Fill form" - Auto-fill all fields
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-indigo-400 rounded-full'></span>
                        "Fill [field name]" - Single field fill
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-indigo-400 rounded-full'></span>
                        "Focus [field]" - Smart field focusing
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-indigo-400 rounded-full'></span>
                        "Clear form" - Reset all fields
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-indigo-400 rounded-full'></span>
                        "Submit form" - Automatic submission
                     </li>
                  </ul>
               </div>

               <div className='bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300'>
                  <div className='flex items-center gap-3 mb-6'>
                     <div className='p-3 bg-purple-100 rounded-lg'>
                        <Brain className='w-6 h-6 text-purple-600' />
                     </div>
                     <h2 className='text-2xl font-semibold text-gray-800'>Smart Features</h2>
                  </div>
                  <ul className='space-y-3 text-gray-600'>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-purple-400 rounded-full'></span>
                        "Read page" - Text-to-speech
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-purple-400 rounded-full'></span>
                        "Zoom in/out" - View adjustment
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-purple-400 rounded-full'></span>
                        "Find [text]" - Page search
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-purple-400 rounded-full'></span>
                        "Translate page" - Language switch
                     </li>
                     <li className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-purple-400 rounded-full'></span>
                        "Dark mode" - Theme toggle
                     </li>
                  </ul>
               </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
               <div className='bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-xl p-8 text-white'>
                  <h3 className='text-2xl font-semibold mb-4'>Pro Tips</h3>
                  <ul className='space-y-3'>
                     <li className='flex items-center gap-3'>
                        <span className='custom-padding-label bg-white/20 rounded'>✨</span>
                        Commands are case-insensitive and flexible
                     </li>
                     <li className='flex items-center gap-3'>
                        <span className='custom-padding-label bg-white/20 rounded'>🎯</span>
                        Partial matches work for clicking elements
                     </li>
                     <li className='flex items-center gap-3'>
                        <span className='custom-padding-label bg-white/20 rounded'>🔍</span>
                        Smart context detection for better accuracy
                     </li>
                     <li className='flex items-center gap-3'>
                        <span className='custom-padding-label bg-white/20 rounded'>🌐</span>
                        Works seamlessly across all websites
                     </li>
                  </ul>
               </div>

               <div className='bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white'>
                  <h3 className='text-2xl font-semibold mb-4'>Getting Started</h3>
                  <ul className='space-y-3'>
                     <li className='flex items-center gap-3'>
                        <span className='custom-padding-label bg-white/20 rounded'>1</span>
                        Click the microphone icon to start listening
                     </li>
                     <li className='flex items-center gap-3'>
                        <span className='custom-padding-label bg-white/20 rounded'>2</span>
                        Speak any command naturally
                     </li>
                     <li className='flex items-center gap-3'>
                        <span className='custom-padding-label bg-white/20 rounded'>3</span>
                        Customize fields in settings
                     </li>
                     <li className='flex items-center gap-3'>
                        <span className='custom-padding-label bg-white/20 rounded'>4</span>
                        Watch the magic happen!
                     </li>
                  </ul>
               </div>
            </div>

            <CommandFeedback command={currentCommand} isProcessing={isProcessing} />
            <VoiceControl onCommand={onCommand} />
         </div>
         <Footer />
      </div>
   );
}

export default App;
