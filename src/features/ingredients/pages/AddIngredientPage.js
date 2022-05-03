import {
    TextField,
    Typography,
    Paper,
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    ListItem,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Fragment, useContext, useEffect, useState } from 'react'
import { SnackBarContext } from '../../../context/SnackBarContext'
import { useInput } from '../../../hooks/useInput'
import {
    postIngredient,
    fetchCategoryIngredients,
} from '../../../services/ingredientsAPI'
import { fetchProviders } from '../../../services/providersAPI'
import AddCategoryDialog from '../AddCategoryDialog'
import AddProviderDialog from '../../providers/AddProviderDialog'
import AutocompleteCategories from '../AutocompleteCategories'

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

const AddIngredientPage = () => {
    const snackbar = useContext(SnackBarContext)

    const name = useInput('')
    const description = useInput('')
    const brand = useInput('')
    const code_provider = useInput('')
    const code_internal = useInput('')
    const [provider, setProvider] = useState('')
    const [providerOptions, setProviderOptions] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [categories, setCategories] = useState([])

    /* DIALOG - CATEGORY */
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false)

    const handleClickOpenDialog = () => {
        setOpenCategoryDialog(true)
    }
    const handleCloseDialog = () => {
        setOpenCategoryDialog(false)
    }
    const handleSuccessDialog = (category) => {
        setCategories([...categories, category])
    }

    /* DIALOG - PROVIDER */
    const [openProviderDialog, setOpenProviderDialog] = useState(false)

    const handleClickOpenProviderDialog = () => {
        setOpenProviderDialog(true)
    }
    const handleCloseProviderDialog = () => {
        setOpenProviderDialog(false)
    }
    const handleSuccessProviderDialog = (provider) => {
        setProviderOptions([...providerOptions, provider])
    }

    useEffect(() => {
        Promise.all([fetchCategoryIngredients(), fetchProviders()]).then(
            (results) => {
                setCategories(results[0].results)
                setProviderOptions(results[1].results)
            }
        )
    }, [])

    const handleSubmit = () => {
        postIngredient({
            name: name.value,
            description: description.value,
            brand: brand.value,
            code_provider: code_provider.value,
            code_internal: code_internal.value,
            categories,
            provider_id: provider ? provider : null,
        })
            .then((res) => {
                if (res.status >= 200 && res.status <= 300)
                    snackbar.setAlert(
                        'success',
                        `Ingredient ${name.value} has been added to your Library.`
                    )
                else
                    snackbar.setAlert(
                        'error',
                        'There was an error, please try again later.'
                    )
            })
            .catch((err) =>
                snackbar.setAlert(
                    'error',
                    'There was an error, please try again later.'
                )
            )
    }

    const handleCategoryDelete = (chipToDelete) => () => {
        setSelectedCategories((chips) =>
            chips.filter((chip) => chip.id !== chipToDelete.id)
        )
    }

    const renderProviders = (providers) => {
        return providers.map((provider) => (
            <MenuItem key={provider.id} value={provider.id}>
                {provider.name}
            </MenuItem>
        ))
    }

    const ChipCategories = ({ selectedCategories, handleDelete }) => {
        return (
            <Paper
                sx={{
                    margin: '1.5rem 0 0 0',
                    padding: 0,
                }}
                component="ul"
            >
                {selectedCategories.map((data) => {
                    return (
                        <ListItem
                            key={data.id}
                            sx={{
                                display: 'inline',
                                margin: 0,
                                paddingY: 0,
                                paddingX: 1,
                            }}
                        >
                            <Chip
                                label={data.name}
                                onDelete={handleDelete(data)}
                                sx={{
                                    backgroundColor: data.color,
                                    fontWeight: 500,
                                    fontSize: 14,
                                    padding: 1,
                                }}
                            />
                        </ListItem>
                    )
                })}
            </Paper>
        )
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
                        <Typography variant="h6">Name</Typography>
                        <Typography variant="smallBody">
                            A short name you want to give to the ingredient.
                        </Typography>
                    </Box>
                    <Box {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={name.value}
                            setValue={name.setValue}
                            required
                        />
                    </Box>
                    <Box {...itemRowArgs(false)}>
                        <Typography variant="h6">Descriptive Name</Typography>
                        <Typography variant="smallBody">
                            A longer, more descriptive name, which will help
                            identify the ingredient.
                        </Typography>
                    </Box>
                    <Box {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={description.value}
                            setValue={description.setValue}
                        />
                    </Box>
                    <Box {...itemRowArgs(false)}>
                        <Typography variant="h6">Brand</Typography>
                        <Typography variant="smallBody">
                            The ingredient's brand, producer, manufacturer, etc.
                        </Typography>
                    </Box>
                    <Box {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={brand.value}
                            setValue={brand.setValue}
                        />
                    </Box>
                    <Box {...itemRowArgs(false)}>
                        <Typography variant="h6">Categories</Typography>
                        <Typography variant="smallBody">
                            The identification code that you want to use
                            internally.
                        </Typography>
                        <ChipCategories
                            handleDelete={handleCategoryDelete}
                            selectedCategories={selectedCategories}
                        />
                    </Box>
                    <Box
                        {...itemRowArgs(false, {
                            display: { xs: 0, sm: 0, md: 'flex' },
                            alignItems: 'center',
                            justifyContent: 'end',
                            gap: 2,
                        })}
                    >
                        <AutocompleteCategories
                            labels={categories}
                            value={selectedCategories}
                            setValue={setSelectedCategories}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={handleClickOpenDialog}
                        >
                            Create Category
                        </Button>
                    </Box>
                    <Box {...itemRowArgs(false)}>
                        <Typography variant="h6">Provider</Typography>
                        <Typography variant="smallBody">
                            Choose from your saved providers, or quickly add
                            one.
                        </Typography>
                    </Box>
                    <Box
                        {...itemRowArgs(true, {
                            display: { xs: 0, sm: 0, md: 'flex' },
                            alignBoxs: 'center',
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
                                {renderProviders(providerOptions)}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={handleClickOpenProviderDialog}
                            sx={{
                                alignSelf: 'center',
                                float: 'right',
                                marginTop: { xs: 2, sm: 2, md: 0 },
                            }}
                        >
                            Create Provider
                        </Button>
                    </Box>

                    <Box {...itemRowArgs(false)}>
                        <Typography variant="h6">Provider Code</Typography>
                        <Typography variant="smallBody">
                            The identification code that the Provider uses.
                        </Typography>
                    </Box>
                    <Box iem {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={code_provider.value}
                            setValue={code_provider.setValue}
                        />
                    </Box>
                    <Box {...itemRowArgs(false)}>
                        <Typography variant="h6">Internal Code</Typography>
                        <Typography variant="smallBody">
                            The identification code that you want to use
                            internally.
                        </Typography>
                    </Box>
                    <Box {...itemRowArgs(true)}>
                        <AddIngTextField
                            value={code_internal.value}
                            setValue={code_internal.setValue}
                        />
                    </Box>
                </Box>
                <Box sx={{ marginTop: 4 }} />
                <Box sx={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={handleSubmit}
                    >
                        Add Ingredient
                    </Button>
                </Box>
            </Paper>
            <AddCategoryDialog
                handleClose={handleCloseDialog}
                open={openCategoryDialog}
                onSuccess={handleSuccessDialog}
            />
            <AddProviderDialog
                handleClose={handleCloseProviderDialog}
                open={openProviderDialog}
                onSuccess={handleSuccessProviderDialog}
            />
        </Fragment>
    )
}

export default AddIngredientPage
