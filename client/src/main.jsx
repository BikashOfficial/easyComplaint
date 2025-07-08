import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContext from './contexts/UserContext.jsx'
import AdminContext from './contexts/AdminContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext>
      <AdminContext>
        <App />
      </AdminContext>
    </UserContext>
  </React.StrictMode>,
)
