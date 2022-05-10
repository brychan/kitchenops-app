import { Fragment, useEffect, useState } from 'react'
import { Button, Box } from '@mui/material'
import PackagingCreateDialog from '../PackagingCreateDialog'
import { fetchOneIngredientPackagingIngredients } from '../../../services/ingredientsAPI'
import PackagingSimpleTable from '../PackagingSimpleTable'

const TabPackaging = () => {
    const [createPackagingDialogOpen, setCreatePackagingDialogOpen] =
        useState(false)

    const [state, setState] = useState({
        packagingsData: [],
        error: '',
        isLoading: true,
    })

    const handleOpenDialog = () => {
        setCreatePackagingDialogOpen(true)
    }
    const handleCloseDialog = () => {
        setCreatePackagingDialogOpen(false)
    }
    const handleSuccessDialog = (packaging) => {
        setState({
            ...state,
            packagingsData: [...state.packagingsData, packaging]
        })
    }

    useEffect(() => {
        fetchOneIngredientPackagingIngredients(1)
            .then((res) =>
                setState({ ...state, packagingsData: res, isLoading: false })
            )
            .catch((error) => setState({ isLoading: false, error }))
    }, [])

    if (state.isLoading) return <div>'Loading'</div>
    if (state.error) return <div>There was an error.</div>

    return (
        <Fragment>
            <PackagingCreateDialog
                open={createPackagingDialogOpen}
                handleCloseDialog={handleCloseDialog}
                onSuccess={handleSuccessDialog}
            />
            {state.packagingsData.length === 0 ? (
                <div>No Packaging found.</div>
            ) : (
                <PackagingSimpleTable data={state.packagingsData} />
            )}

            <Box sx={{ m: 1, textAlign: 'right' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleOpenDialog}
                >
                    Create New Packaging
                </Button>
            </Box>
        </Fragment>
    )
}

export default TabPackaging
