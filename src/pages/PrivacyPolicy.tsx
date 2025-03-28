import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
   const navigate = useNavigate();

   return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12'>
         <div className='container mx-auto px-6 lg:px-12'>
            <button
               onClick={() => navigate(-1)}
               className='mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition'>
               ← Back
            </button>
            <div className='bg-white rounded-2xl shadow-lg p-8 lg:p-12'>
               <h1 className='text-4xl font-extrabold text-gray-800 mb-6 text-center'>Privacy Policy</h1>
               <p className='text-gray-600 text-lg mb-6'>
                  At <strong>Voice-Driven Web Assistant</strong>, we value your privacy. This Privacy Policy outlines how we collect, use,
                  and protect your information when you use our application.
               </p>
               <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>Information We Collect</h2>
               <ul className='list-disc list-inside text-gray-600 text-lg space-y-3'>
                  <li>Voice commands processed locally in your browser.</li>
                  <li>Settings and preferences stored in your browser's local storage.</li>
                  <li>No personal data is transmitted to our servers.</li>
               </ul>
               <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>How We Use Your Information</h2>
               <p className='text-gray-600 text-lg mb-6'>
                  We use your information solely to provide the functionality of the application. Your voice commands and settings remain
                  private and are not shared with third parties.
               </p>
               <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>Your Rights</h2>
               <p className='text-gray-600 text-lg mb-6'>
                  You have the right to clear your local storage at any time to remove all stored settings and preferences.
               </p>
               <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>Contact Us</h2>
               <p className='text-gray-600 text-lg'>
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href='mailto:support@voicedrivenassistant.com' className='text-blue-600 hover:underline'>
                     support@voicedrivenassistant.com
                  </a>
                  .
               </p>
            </div>
         </div>
      </div>
   );
};

export default PrivacyPolicy;
