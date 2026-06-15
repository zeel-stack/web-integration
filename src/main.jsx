import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import clevertap from 'clevertap-web-sdk'

clevertap.init('Z4R-474-W87Z','eu1')
clevertap.setLogLevel(3);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
