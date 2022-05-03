import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Box, TextField } from '@mui/material'

import { CirclePicker } from 'react-color'
import { grey } from '@mui/material/colors'
import { useInput } from '../../hooks/useInput'
import { postCategoryIngredients } from '../../services/ingredientsAPI'
import { SnackBarContext } from '../../context/SnackBarContext'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
}

const itemRowArgs = (borderBottom, extraStyles = {}) => {
    return {
        sx: !borderBottom
            ? {
                  borderBottom: { md: '1px solid', sm: 0 },
                  borderColor: { md: grey[300], sm: 0 },
                  paddingY: 2,
                  ...extraStyles,
              }
            : {
                  borderBottom: '1px solid',
                  borderColor: grey[300],
                  paddingY: 2,
                  ...extraStyles,
              },
    }
}

export default function AddCategoryDialog({
    handleClose,
    open,
    onSuccess = () => {},
}) {
    const [color, setColor] = useState({ hex: '#f44336' })
    const name = useInput('')
    const snackbar = useContext(SnackBarContext)

    const onChangeComplete = (color, event) => {
        setColor(color)
    }

    const onSubmit = () => {
        postCategoryIngredients({
            color: color.hex,
            name: name.value,
        }).then((res) => {
            console.log(res)
            if (res.status >= 200 && res.status <= 300) {
                onSuccess(res.data)
                snackbar.setAlert(
                    'success',
                    `Category ${name.value} has been added to your Library.`
                )
            } else
                snackbar.setAlert(
                    'error',
                    'There was an error, please try again later.'
                )
            handleClose()
        })
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    Create New Category
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(1,1fr)',
                                md: 'repeat(2,1fr)',
                            },
                        }}
                    >
                        <Box {...itemRowArgs(false)}>
                            <Typography>Category's Name</Typography>
                        </Box>
                        <Box {...itemRowArgs(true)}>
                            <TextField
                                required
                                label="Required"
                                type="text"
                                color="secondary"
                                value={name.value}
                                onChange={(e) => name.setValue(e.target.value)}
                                sx={{ width: '100%' }}
                            />
                        </Box>
                        <Box {...itemRowArgs(true, { border: 0 })}>
                            <Typography>Choose a Color</Typography>
                        </Box>
                        <Box
                            {...itemRowArgs(true, {
                                border: 0,
                                justifySelf: 'end',
                            })}
                        >
                            <CirclePicker
                                color={color}
                                onChangeComplete={onChangeComplete}
                                circleSpacing={10}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 4 }} />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={onSubmit}
                    >
                        Create Category
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}
