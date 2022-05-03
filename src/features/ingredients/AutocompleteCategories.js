import * as React from 'react'
import PropTypes from 'prop-types'
import { useTheme, styled } from '@mui/material/styles'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete'
import { Button } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 16,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: 8,
            borderBottom: '1px solid #eaecef',
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',
            },
            '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]':
                {
                    backgroundColor: theme.palette.action.hover,
                },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}))

function PopperComponent(props) {
    const { disablePortal, anchorEl, open, ...other } = props
    return <StyledAutocompletePopper {...other} />
}

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: '1px solid #e1e4e8',
    boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
    borderRadius: 6,
    width: 350,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: '#24292e',
    backgroundColor: '#fff',
}))

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: '1px solid #eaecef',
    '& input': {
        borderRadius: 4,
        backgroundColor: '#fff',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: '#eaecef',
        fontSize: 14,
        '&:focus': {
            boxShadow: '0px 0px 0px 3px rgba(3, 102, 214, 0.3)',
            borderColor: '#0366d6',
        },
    },
}))

export default function AutocompleteCategories({ value, setValue, labels, sx }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [pendingValue, setPendingValue] = React.useState([])
    const theme = useTheme()

    const handleClick = (event) => {
        setPendingValue(value)
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setValue(pendingValue)
        if (anchorEl) {
            anchorEl.focus()
        }
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'github-label' : undefined

    return (
        <React.Fragment>
            <Box>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    aria-describedby={id}
                    onClick={handleClick}
                    sx={sx}
                >
                    Search Categories
                </Button>
            </Box>
            <StyledPopper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <div>
                        <Autocomplete
                            open
                            multiple
                            onClose={(event, reason) => {
                                if (reason === 'escape') {
                                    handleClose()
                                }
                            }}
                            value={pendingValue}
                            onChange={(event, newValue, reason) => {
                                if (
                                    event.type === 'keydown' &&
                                    event.key === 'Backspace' &&
                                    reason === 'removeOption'
                                ) {
                                    return
                                }
                                setPendingValue(newValue)
                            }}
                            disableCloseOnSelect
                            PopperComponent={PopperComponent}
                            renderTags={() => null}
                            noOptionsText="No labels"
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Box
                                        component={DoneIcon}
                                        sx={{
                                            width: 17,
                                            height: 17,
                                            mr: '5px',
                                            ml: '-2px',
                                        }}
                                        style={{
                                            visibility: selected
                                                ? 'visible'
                                                : 'hidden',
                                        }}
                                    />
                                    <Box
                                        component="span"
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            flexShrink: 0,
                                            borderRadius: '3px',
                                            mr: 1,
                                            mt: '2px',
                                        }}
                                        style={{
                                            backgroundColor: option.color,
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            '& span': {
                                                color:
                                                    theme.palette.mode ===
                                                    'light'
                                                        ? '#586069'
                                                        : '#8b949e',
                                            },
                                        }}
                                    >
                                        {option.name}
                                        <br />
                                    </Box>
                                    <Box
                                        component={CloseIcon}
                                        sx={{
                                            opacity: 0.6,
                                            width: 18,
                                            height: 18,
                                        }}
                                        style={{
                                            visibility: selected
                                                ? 'visible'
                                                : 'hidden',
                                        }}
                                    />
                                </li>
                            )}
                            options={[...labels].sort((a, b) => {
                                // Display the selected labels first.
                                let ai = value.indexOf(a)
                                ai =
                                    ai === -1
                                        ? value.length + labels.indexOf(a)
                                        : ai
                                let bi = value.indexOf(b)
                                bi =
                                    bi === -1
                                        ? value.length + labels.indexOf(b)
                                        : bi
                                return ai - bi
                            })}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <StyledInput
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    autoFocus
                                    placeholder="Filter categories"
                                />
                            )}
                        />
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </React.Fragment>
    )
}
