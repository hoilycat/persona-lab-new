import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './my-animal-face.css'
import App from './my-animal-face.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
