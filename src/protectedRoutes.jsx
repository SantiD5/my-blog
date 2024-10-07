import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/authContext'
export function ProtectedRoutes() {
  const {isAuthenticated,loading} = useAuth()
  console.log(isAuthenticated,loading)
  if(loading) return <h1>Loading</h1>
  if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>
  return (
    <Outlet/>
  )
}

