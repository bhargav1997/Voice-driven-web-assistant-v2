const Footer = () => {
   return (
      <footer className='bg-gray-800 text-gray-300 py-6'>
         <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
               <p className='text-sm'>© {new Date().getFullYear()} Voice-Driven Web Assistant. All rights reserved.</p>
               <div className='flex space-x-4 mt-4 md:mt-0'>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors' aria-label='GitHub'>
                     GitHub
                  </a>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors' aria-label='Privacy Policy'>
                     Privacy Policy
                  </a>
                  <a href='#' className='text-gray-400 hover:text-white transition-colors' aria-label='Terms of Service'>
                     Terms of Service
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
