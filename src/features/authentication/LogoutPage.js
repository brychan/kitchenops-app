import React, { useContext, useState, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { logoutUser } from '../../services/authAPI'
import { AuthContext } from '../../context/AuthContext'

export function LogoutPage() {

    const [redirect, setRedirect] = useState(null)
    const { setUser } = useContext(AuthContext)

    useEffect(() => {
        const start = Date.now()
        logoutUser().then((response) => {
            const now = Date.now()
            setTimeout(() => {
                setUser(null)
                setRedirect('/')
            }, 2000 - (now - start))
        })
    })

    if (redirect) {
        return <Navigate replace to={redirect} />
    }

    return <div className="p-8">You have been logged out, redirecting...</div>
}
