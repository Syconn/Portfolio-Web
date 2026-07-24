import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
import Desktop from './Desktop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Desktop />
    <title>Aidan Haacks - Portfolio</title>
  </StrictMode>,
)
