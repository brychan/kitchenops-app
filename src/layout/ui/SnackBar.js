import { forwardRef, useContext } from 'react'
import { SnackBarContext } from '../../context/SnackBarContext'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SnackBar() {
    const snackbar = useContext(SnackBarContext)
    console.log(snackbar)
    return (
        <Snackbar open={snackbar.open} autoHideDuration={snackbar.message.duration} onClose={snackbar.handleClose}>
            <Alert
                onClose={snackbar.handleClose}
                severity={snackbar.message.severity}
                sx={{ width: '100%' }}
            >
                {snackbar.message.text}
            </Alert>
        </Snackbar>
    )
}
