import { Button, Box } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SnackBarContext } from '../../../context/SnackBarContext'
import {
    fetchOneNutritionIngredients,
    patchNutritionIngredients,
} from '../../../services/ingredientsAPI'
import NutritionalSimpleTable from '../NutritionalSimpleTable'
const TabNutritionalPage = () => {
    const { ingredientId } = useParams()
    const snackbar = useContext(SnackBarContext)
    const [state, setState] = useState({
        nutrition: {},
        formErrors: {},
        isLoading: true,
        error: '',
        isEdit: false,
    })
    useEffect(() => {
        fetchOneNutritionIngredients(ingredientId)
            .then((res) => {
                setState({
                    ...state,
                    nutrition: res,
                    isLoading: false,
                })
            })
            .catch((error) =>
                setState({
                    ...state,
                    isLoading: false,
                    error: error.message,
                })
            )
    }, [])

    const validateFields = () => {
        let hasErrors = false
        let errors = {
            calories: isNaN(Number(state.nutrition.calories)),
            protein: isNaN(Number(state.nutrition.protein)),
            carbs: isNaN(Number(state.nutrition.carbs)),
            carbs_fiber: isNaN(Number(state.nutrition.carbs_fiber)),
            carbs_sugar: isNaN(Number(state.nutrition.carbs_sugar)),
            fats: isNaN(Number(state.nutrition.fats)),
            fats_sat: isNaN(Number(state.nutrition.fats_sat)),
            fats_trans: isNaN(Number(state.nutrition.fats_trans)),
            fats_poly: isNaN(Number(state.nutrition.fats_poly)),
            fats_mono: isNaN(Number(state.nutrition.fats_mono)),
        }
        for (let key of Object.keys(errors)) {
            hasErrors = hasErrors || errors[key]
        }
        console.log(hasErrors, errors)
        return {
            hasErrors,
            errors,
        }
    }
    const handleSave = () => {
        const validatedForm = validateFields()
        if (validatedForm.hasErrors) {
            setState({ ...state, formErrors: validatedForm.errors })
            return null
        }

        patchNutritionIngredients(state.nutrition)
            .then((res) => {
                if (res.status >= 200 && res.status <= 300 && res.data === 1) {
                    setState({ ...state, isEdit: false })
                    snackbar.setAlert(
                        'success',
                        `Nutritional Information has been updated.`
                    )
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

    const handleChange = (value, type) => {
        setState({
            ...state,
            nutrition: {
                ...state.nutrition,
                [type]: value,
            },
        })
    }

    if (state.isLoading) return <div>Loading</div>
    if (state.error) return <div>There was an error</div>
    return (
        <div>
            <NutritionalSimpleTable
                data={state.nutrition}
                isEdit={state.isEdit}
                formErrors={state.formErrors}
                handleChange={handleChange}
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
        </div>
    )
}

export default TabNutritionalPage
