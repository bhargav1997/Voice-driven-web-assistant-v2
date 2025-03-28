import { useState } from "react";

const HelpModal = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleModal = () => {
      setIsOpen(!isOpen);
   };

   return (
      <>
         {/* Help Icon */}
         <button
            onClick={toggleModal}
            className='fixed top-6 right-6 bg-blue-500 text-white custom-padding-label rounded-full shadow-lg hover:bg-blue-700 transition'
            aria-label='Help'>
            ?
         </button>

         {/* Modal */}
         {isOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
               <div className='bg-white rounded-lg shadow-lg max-w-lg w-full p-6'>
                  <h2 className='text-2xl font-bold text-gray-800 mb-4'>About This Project</h2>
                  <p className='text-gray-600 mb-4'>
                     This project is a <strong>Voice-Driven Web Assistant</strong> built with React, TypeScript, and Vite. It allows users
                     to interact with websites using natural voice commands, providing features like navigation, form autofill, and smart
                     accessibility tools.
                  </p>
                  <ul className='list-disc list-inside text-gray-600 mb-4'>
                     <li>
                        <strong>Voice Commands:</strong> Navigate, scroll, and interact with websites using voice.
                     </li>
                     <li>
                        <strong>Form Autofill:</strong> Automatically fill forms or specific fields.
                     </li>
                     <li>
                        <strong>Smart Features:</strong> Text-to-speech, zoom controls, and more.
                     </li>
                     <li>
                        <strong>Customizable:</strong> Add custom form fields in the settings.
                     </li>
                  </ul>
                  <p className='text-gray-600'>
                     Built with modern tools like <strong>React</strong>, <strong>TypeScript</strong>, <strong>Vite</strong>, and{" "}
                     <strong>Tailwind CSS</strong>, this app is designed for accessibility and ease of use.
                  </p>
                  <div className='mt-6 text-right'>
                     <button onClick={toggleModal} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
                        Close
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default HelpModal;
