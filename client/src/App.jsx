import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MultiPageForm from './components/MoveoutPage3';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import ProfileDetailsForm from './components/ProfileDetails';
import ContactDetails from './components/ContactDetails';
import CongratsPage from './components/CongratsPage';
import NavbarContent from './components/Navbar';
import CustomerLanding from './components/CustomerLanding';



function App() {

  const { theme } = useContext(AppContext);
  return (
    <div className=''>
      <div id="app-test" className="">
        <NavbarContent />
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<ListingApplication />} /> */}
            <Route path="/create" >
              <Route path="listing-details" element={<ProfileDetailsForm />} />
              <Route path="contact-details" element={<ContactDetails />} />
              <Route path="congrats" element={<CongratsPage />} />
            </Route>
            <Route path='/add-items' element={<MultiPageForm />} />
            <Route path='/:eventIdentifier' element={<CustomerLanding />} />
          </Routes>
        </BrowserRouter >
      </div >

    </div >
  )
}

export default App
