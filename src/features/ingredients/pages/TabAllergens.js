import { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    fetchOneAllergensIngredients,
    patchAllergensIngredients,
} from '../../../services/ingredientsAPI'
import AllergensSimpleTable from '../AllergensSimpleTable'
import { Button, Box } from '@mui/material'
import { SnackBarContext } from '../../../context/SnackBarContext'

const TabAllergens = () => {
    const { ingredientId } = useParams()
    const snackbar = useContext(SnackBarContext)
    const [state, setState] = useState({
        allergens: {},
        isLoading: true,
        error: '',
        isEdit: false,
    })
    useEffect(() => {
        fetchOneAllergensIngredients(ingredientId)
            .then((res) =>
                setState({ ...state, allergens: res, isLoading: false })
            )
            .catch((err) =>
                setState({ ...state, isLoading: false, error: err.message })
            )
    }, [])
    if (state.isLoading) return <div>Loading...</div>
    if (state.error) return <div>{state.error}</div>
    const handleChangeSelection = (allergen, newValue) => {
        setState({
            ...state,
            allergens: {
                ...state.allergens,
                [allergen]: newValue === '' ? null : newValue,
            },
        })
    }
    const handleSave = () => {
        patchAllergensIngredients(state.allergens)
            .then((res) => {
                if (res.status >= 200 && res.status <= 300) {
                    setState({ ...state, isEdit: false })
                    snackbar.setAlert('success', `Allergens have been updated.`)
                } else
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
    return (
        <Fragment>
            <AllergensSimpleTable
                data={state.allergens}
                isEdit={state.isEdit}
                handleChangeSelection={handleChangeSelection}
            />
            <Box sx={{ textAlign: 'right' }}>
                {state.isEdit ? (
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={() => setState({ ...state, isEdit: true })}
                    >
                        Edit
                    </Button>
                )}
            </Box>
        </Fragment>
    )
}

export default TabAllergens
