import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MultiPageForm from './components/SaleItemContainer';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import ProfileDetailsForm from './components/ProfileDetails';
import ContactDetails from './components/ContactDetails';
import CongratsPage from './components/CongratsPage';
import NavbarContent from './components/Navbar';
import CustomerLanding from './components/CustomerLanding';



const Layout = () => {
  return (
    <>
      <NavbarContent />
      <Outlet />
    </>
  );
};




function App() {




  const { theme } = useContext(AppContext);
  return (
    <div className=''>
      <div id="app-test" className="">
        <BrowserRouter>
          <Routes>
            <Route path="/:eventIdentifier" element={<CustomerLanding />} />
            <Route element={<Layout />}>
              <Route path="/create" >
                <Route path="listing-details/:eventIdentifier?" element={<ProfileDetailsForm />} />
                <Route path="congrats" element={<CongratsPage />} />
              </Route>
              <Route path='/add-items' element={<MultiPageForm />} />
            </Route>
          </Routes>

        </BrowserRouter >
      </div >

    </div >
  )
}

export default App
