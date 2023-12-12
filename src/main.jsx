import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthContext } from './Context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <AuthContext>
      <App />
    </AuthContext>

  </BrowserRouter>
)
