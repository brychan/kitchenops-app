import { useContext, useState } from 'react'

import { CssBaseline, Box } from '@mui/material'

import AppRoutes from '../main/AppRoutes'

import DrawerLayout from './DrawerLayout'
import DrawerHeader from './ui/DrawerHeader'
import TopAppBarLayout from './TopAppBarLayout'
import { AuthContext } from '../context/AuthContext'
import LoginPage from '../features/authentication/LoginPage'
import SnackBar from './ui/SnackBar'
export default function MainLayout() {
    const [open, setOpen] = useState(false)
    const auth = useContext(AuthContext)

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    
    if (!auth.user) {
        return <LoginPage />
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopAppBarLayout open={open} handleDrawerOpen={handleDrawerOpen} />
            <DrawerLayout open={open} handleDrawerClose={handleDrawerClose} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ maxWidth: '1600px' }}>
                    <AppRoutes />
                </Box>
                <SnackBar />
            </Box>
        </Box>
    )
}
