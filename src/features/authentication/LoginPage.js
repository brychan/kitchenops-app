import { useState, useContext } from 'react'
import { signInUser } from '../../services/authAPI'
import { useNavigate } from 'react-router-dom'

import { blueGrey, indigo } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AuthContext } from '../../context/AuthContext'

const theme = createTheme({
    palette: {
        primary: {
            main: blueGrey[700],
        },
        secondary: {
            main: indigo[600],
        },
        background: {
            default: blueGrey[700],
        },
    },
})

const LoginPage = () => {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [erroValue, setErrorValue] = useState()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            email: emailInput,
            password: passwordInput,
        }

        signInUser(user).then((response) => {
            if (response && response.status === 200) {
                auth.setUser(response.data.user)
                navigate('/', {
                    replace: true,
                })
            } else if (response && response.status === 400) {
                setErrorValue(response.data.message)
            } else {
                setErrorValue('There was a problem, try again later.')
            }
        })
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{
                        backgroundColor: '#FFF',
                        borderRadius: '8px',
                        padding: '2rem 1rem 1rem 2rem',
                        marginTop: 8,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={passwordInput}
                                onChange={(e) =>
                                    setPasswordInput(e.target.value)
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default LoginPage
