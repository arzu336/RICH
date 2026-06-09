import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>
)

// Service worker gecici kapali (Vercel deploy / eski cache sorunlarini onlemek icin)
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').catch(() => {});
//   });
// }
