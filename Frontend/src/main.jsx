import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from "./components/common/ErrorBoundary";
import {
  AuthProvider,
} from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>
   <Toaster position="top-right" />
<ErrorBoundary>
    <App />
</ErrorBoundary>
    
    </AuthProvider>
  </StrictMode>,
)
