import { useState, useContext } from 'react'
import Dialog from '../../layout/ui/Dialog'
import { postPackagingIngredients } from '../../services/ingredientsAPI'
import PackagingCreateForm from './PackagingCreateForm'
import { SnackBarContext } from '../../context/SnackBarContext'

const PackagingCreateDialog = ({ open, handleCloseDialog, onSuccess }) => {
    const snackbar = useContext(SnackBarContext)
    const [values, setValues] = useState({
        _isPackage: '',
        _measurementUnit: '',
        _package_weight: '',
        _package_name: '',
        _package_amount_units: '',
        _package_price: '',
        _loose_unit: '',
        _loose_unit_load: '',
        _loose_price: '',
    })
    const onSubmit = () => {
        postPackagingIngredients(values).then((res) => {
            if (res.status >= 200 && res.status <= 300) {
                onSuccess(res.data)
                snackbar.setAlert(
                    'success',
                    `Packaging has been added to your Library.`
                )
            } else
                snackbar.setAlert(
                    'error',
                    'There was an error, please try again later.'
                )
            handleCloseDialog()
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    return (
        <Dialog
            titleText="Create New Packaging"
            buttonText="Create"
            open={open}
            handleClose={handleCloseDialog}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            content={
                <PackagingCreateForm
                    values={values}
                    handleChange={handleChange}
                />
            }
        />
    )
}

export default PackagingCreateDialog
