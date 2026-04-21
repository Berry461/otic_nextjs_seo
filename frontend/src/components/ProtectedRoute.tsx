'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if the user has an access token in their browser
    const token = localStorage.getItem('access')
    
    if (!token) {
      // If no token, kick them to the login page
      router.push('/login') // Change this to '/admin/login' if that is your actual login route
    } else {
      // If token exists, allow the page to load
      setIsAuthenticated(true)
    }
  }, [router])

  // Show nothing (or a loading spinner) while we check the token
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    )
  }

  // If authenticated, render the page exactly as normal
  return <>{children}</>
}