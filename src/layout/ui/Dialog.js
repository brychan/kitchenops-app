import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import MuiDialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(MuiDialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

export default function Dialog({ titleText, buttonText, open, handleClose, onSuccess, onSubmit, content }) {
    return (
        <BootstrapDialog
            fullWidth
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{ width: {xs: '100%', sm: '100%', md:'75%'}}}
        >
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
            >
                {titleText}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {content}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={onSubmit}
                >
                    {buttonText}
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}
