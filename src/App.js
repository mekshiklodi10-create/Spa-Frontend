import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home"; 
import PackagesPage from "./pages/PackagesPage"; 
import Contact from "./pages/Contact"; 
import ServicesPage from "./pages/ServicesPage"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Dashboard from "./pages/Admin/Dashboard"; 
import ReservationForm from "./pages/ReservationForm"; 
import Profile from "./pages/Profile"; 

function App() { 
  
  return ( 
  <Router> 
    <Routes> 
      <Route path="/" element={<><Navbar /><Home /></>} /> 
      <Route path="/packages" element={<><Navbar /><PackagesPage /></>} /> 
      <Route path="/services" element={<><Navbar /><ServicesPage /></>} /> 
      <Route path="/contact" element={<><Navbar /><Contact /></>} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 
      <Route path="/admin/dashboard" element={ <Dashboard /> }/> 
      <Route path="/reservation" element={<ReservationForm />} /> 
      <Route path="/profile" element={<><Navbar /><Profile /></>} /> 
    </Routes> 
  </Router> 
  ); 
} 

export default App;