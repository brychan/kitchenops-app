import {
    TextField,
    Typography,
    Paper,
    Box,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Fragment, useContext, useState } from 'react'
import { SnackBarContext } from '../../../context/SnackBarContext'
import { useInput } from '../../../hooks/useInput'
import { postIngredient } from '../../../services/ingredientsAPI'

const AddIngTextField = ({ value, setValue, required }) => {
    return (
        <TextField
            required={required}
            sx={{ width: '100%' }}
            value={value}
            label={required ? 'Required' : ''}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            color="secondary"
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}

const itemRowArgs = (borderBottom, extraStyles = {}) => {
    return {
        xs: 12,
        sm: 12,
        md: 6,
        sx: !borderBottom
            ? {
                  borderBottom: { md: '1px solid', sm: 0 },
                  borderColor: { md: grey[300], sm: 0 },
                  paddingBottom: 2,
                  ...extraStyles,
              }
            : {
                  borderBottom: '1px solid',
                  borderColor: grey[300],
                  paddingBottom: 2,
                  ...extraStyles,
              },
    }
}

const AddIngredientPage = () => {
    const snackbar = useContext(SnackBarContext)
    const name = useInput('')
    const description = useInput('')
    const brand = useInput('')
    const code_provider = useInput('')
    const code_internal = useInput('')
    const [provider, setProvider] = useState('')


    const handleSubmit = () => {
        postIngredient({
            name: name.value,
            description: description.value,
            brand: brand.value,
            code_provider: code_provider.value,
            code_internal: code_internal.value,
            //provider,
        }).then((res) => {
            snackbar.setAlert('success', `Ingredient ${name.value} has been added to your Library.`)
        })
    }

    return (
        <Fragment>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="breadcrumbs">
                    Home / Ingredients / Add Ingredient
                </Typography>
            </Box>
            <Paper
                elevation={4}
                sx={{
                    paddingX: 3,
                    paddingY: 2,
                    width: {
                        xs: '100%',
                        sm: '100%',
                        md: '100%',
                        lg: '100%',
                        xl: '66%',
                    },
                }}
            >
                <Typography variant="h5">Add a new Ingredient</Typography>
                <Typography>
                    Create a new ingredient and add it to your library. You only
                    need the name now, and you can fill the rest of the
                    information later on.
                </Typography>
                <Box sx={{ marginTop: 4 }} />
                <Grid
                    container
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                    }}
                >
                    <Grid item {...itemRowArgs(false)}>
                        <Typography variant="h6">Name</Typography>
                        <Typography variant="smallBody">
                            A short name you want to give to the ingredient.
                        </Typography>
                    </Grid>
                    <Grid item {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={name.value}
                            setValue={name.setValue}
                            required
                        />
                    </Grid>
                    <Grid item {...itemRowArgs(false)}>
                        <Typography variant="h6">Descriptive Name</Typography>
                        <Typography variant="smallBody">
                            A longer, more descriptive name, which will help
                            identify the ingredient.
                        </Typography>
                    </Grid>
                    <Grid item {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={description.value}
                            setValue={description.setValue}
                        />
                    </Grid>
                    <Grid item {...itemRowArgs(false)}>
                        <Typography variant="h6">Brand</Typography>
                        <Typography variant="smallBody">
                            The ingredient's brand, producer, manufacturer, etc.
                        </Typography>
                    </Grid>
                    <Grid item {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={brand.value}
                            setValue={brand.setValue}
                        />
                    </Grid>
                    <Grid item {...itemRowArgs(false)}>
                        <Typography variant="h6">Provider</Typography>
                        <Typography variant="smallBody">
                            Choose from your saved providers, or quickly add
                            one.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        {...itemRowArgs(true, {
                            display: { xs: 0, sm: 0, md: 'flex' },
                            alignItems: 'center',
                            gap: 2,
                        })}
                    >
                        <FormControl
                            sx={{
                                flexGrow: 1,
                                width: { xs: '100%', sm: '100%', md: 0 },
                            }}
                        >
                            <InputLabel id="demo-simple-select-label">
                                Choose a Provider
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Choose a Provider"
                                onChange={(e) => setProvider(e.target.value)}
                                value={provider}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            sx={{
                                alignSelf: 'center',
                                float: 'right',
                                marginTop: { xs: 2, sm: 2, md: 0 },
                            }}
                        >
                            Create Provider
                        </Button>
                    </Grid>
                    <Grid item {...itemRowArgs(false)}>
                        <Typography variant="h6">Provider Code</Typography>
                        <Typography variant="smallBody">
                            The identification code that the Provider uses.
                        </Typography>
                    </Grid>
                    <Grid item {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={code_provider.value}
                            setValue={code_provider.setValue}
                        />
                    </Grid>
                    <Grid item {...itemRowArgs(false)}>
                        <Typography variant="h6">Internal Code</Typography>
                        <Typography variant="smallBody">
                            The identification code that you want to use
                            internally.
                        </Typography>
                    </Grid>
                    <Grid item {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={code_internal.value}
                            setValue={code_internal.setValue}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 4 }} />
                <Box sx={{ textAlign: 'right' }}>
                    <Button variant="contained" color="secondary" size="large" onClick={handleSubmit}>
                        Add Ingredient
                    </Button>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default AddIngredientPage