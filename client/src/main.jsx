import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/AppContext';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="">
      <AppProvider>
        <App />
      </AppProvider>
    </div>

  </StrictMode>,
)
