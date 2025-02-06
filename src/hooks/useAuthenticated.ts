import {useEffect, useState} from 'react'

type AuthenticationStatus = {
  isAuthenticated: boolean;
}

const useAuthenticated = (): AuthenticationStatus => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  let storageData: string | null = null;
  if (typeof window !== 'undefined') {
    storageData = localStorage.getItem('auth');
  }

  useEffect(() => {
    if (storageData !== null) {
      setIsAuthenticated(true)
    }
  }, [storageData])

  return {isAuthenticated}
}

export default useAuthenticated