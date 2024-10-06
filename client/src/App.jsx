import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import CreateUsers from './components/CreateUsers';
import UpdateUsers from './components/UpdateUsers';
import ItemUploader from './components/CreateSaleList';
import EventCreationPage from './components/MoveoutPageCreator';
import MultiPageForm from './components/MoveoutPage3';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import CreateListing from './components/CreateListing';
import ListingApplication from './components/ListingApp';
import AddInventory from './components/AddInventory';
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
            {/* <Route path='listing-details' element={<ProfileDetailsForm />} />
            <Route path='contact-details' element={<ContactDetails />} />
            <Route path='/listing-details' element={<ProfileDetailsForm />} />
            <Route path='/contact-details' element={<ContactDetails />} />
            <Route path='/add-inventory' element={<AddInventory />} />
            <Route path='/home' element={<CreateListing />} /> */}
            <Route path='/add-items' element={<MultiPageForm />} />
            <Route path='/customer-landing' element={<CustomerLanding />} />
            <Route path='/:eventIdentifier' element={<CustomerLanding />} />
            {/* <Route path='/users' element={<Users />} />
            <Route path='/create' element={<CreateUsers />} />
            <Route path='/update/:id' element={<UpdateUsers />} /> */}
          </Routes>
        </BrowserRouter >
      </div >

    </div >
  )
}

export default App
