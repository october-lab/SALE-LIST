import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/AppContext';
import { NextUIProvider } from '@nextui-org/react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="" data-theme="light" >
      <AppProvider>
        <App />
      </AppProvider>
    </div>

  </StrictMode>,
)
