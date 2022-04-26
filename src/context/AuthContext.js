import React, { createContext, useState, useEffect } from 'react'

import { fetchCurrentUser } from '../services/authAPI'


const AuthContext = createContext({
    user: null,
    isLoading: true,
    setUser: () => {},
})

const AuthContextProvider = ({ children, redirectedUser }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(!(user || redirectedUser))

    useEffect(() => {
        if (redirectedUser) {
            setUser(redirectedUser)
        } else {
            fetchCurrentUser().then((response) => {
                if (response && response.status === 200 && response.data.user) {
                    setUser(response.data.user)
                } else {
                    setUser(null)
                }
                setLoading(false)
            })
        }
    }, [redirectedUser])

    if (isLoading) {
        return null
    }
    
    return (
        <AuthContext.Provider value={{ user, isLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }
