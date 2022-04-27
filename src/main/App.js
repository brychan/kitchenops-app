import { blueGrey, indigo, grey } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AuthContextProvider } from '../context/AuthContext'
import { SnackBarContextProvider } from '../context/SnackBarContext'

import MainLayout from '../layout/MainLayout'

const fontSerif = "'Playfair Display', serif"
const fontSans = "'Jost', san-serif"

const theme = createTheme({
    palette: {
        primary: {
            main: blueGrey[700],
        },
        secondary: {
            main: indigo[600],
        },
        background: {
            default: grey[100],
        },
    },
    typography: {
        fontFamily: fontSans,
        h5: {
            letterSpacing: -1,
            color: blueGrey[900],
        },
        logo: {
            fontWeight: 700,
            letterSpacing: -2,
            fontFamily: fontSerif,
            color: grey[50],
            fontSize: 36,
        },
        breadcrumbs: {
            fontSize: 14,
            color: indigo[700],
        },
        smallBody: {
            fontSize: 14,
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                rounded: {
                    borderRadius: '8px',
                },
            },
        },
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthContextProvider>
                <SnackBarContextProvider>
                    <MainLayout />
                </SnackBarContextProvider>
            </AuthContextProvider>
        </ThemeProvider>
    )
}

export default App
