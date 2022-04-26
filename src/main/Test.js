import Button from '@mui/material/Button'
import { SnackBarContext } from '../context/SnackBarContext'
import { useContext } from 'react'

export default function Test() {
    const snackbar = useContext(SnackBarContext)
    console.log(snackbar)
    return <Button onClick={() => snackbar.setAlert("warning", "asdasd")}>asda</Button>
}
