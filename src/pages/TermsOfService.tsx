import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
               <h1 className='text-4xl font-extrabold text-gray-800 mb-6 text-center'>Terms of Service</h1>
               <p className='text-gray-600 text-lg mb-6'>
                  Welcome to <strong>Voice-Driven Web Assistant</strong>. By using our application, you agree to the following terms and
                  conditions.
               </p>
               <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>Usage Guidelines</h2>
               <ul className='list-disc list-inside text-gray-600 text-lg space-y-3'>
                  <li>You may use this application for personal and non-commercial purposes only.</li>
                  <li>You agree not to misuse the application or attempt to reverse-engineer its functionality.</li>
               </ul>
               <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>Disclaimer</h2>
               <p className='text-gray-600 text-lg mb-6'>
                  This application is provided "as is" without any warranties. We are not responsible for any issues arising from the use of
                  this application.
               </p>
               <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>Changes to Terms</h2>
               <p className='text-gray-600 text-lg mb-6'>
                  We reserve the right to update these terms at any time. Continued use of the application constitutes acceptance of the
                  updated terms.
               </p>
               <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4'>Contact Us</h2>
               <p className='text-gray-600 text-lg'>
                  If you have any questions about these Terms of Service, please contact us at{" "}
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

export default TermsOfService;
