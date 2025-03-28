import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import "./styles/main.css";
import Home from "./components/Home";

function App() {
   return (
      <Router>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
         </Routes>
      </Router>
   );
}

export default App;
