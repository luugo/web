import { useEffect, useState } from 'react'

type AuthenticationStatus = {
    isAuthenticated: boolean;
}

const useAuthenticated = (): AuthenticationStatus => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    let storageData: any = null;
    if (typeof window !== 'undefined') {
        storageData = localStorage.getItem('luugo');
    }

    useEffect(() => {
        if (storageData !== null) {
            setIsAuthenticated(true)
        }
    }, [storageData])

    return { isAuthenticated }
}

export default useAuthenticated