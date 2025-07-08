import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserProtectedWrapper({ children }) {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.status === 200) {
        setUser(res.data)
        setIsLoading(false)
      }
    }).catch(err => {
      console.log(err)
      localStorage.removeItem('token')
      navigate('/login')
    })
  }, [token])

  if (isLoading) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="loader"></div>
          <style jsx>{`
          .loader {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        </div>
      </>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper