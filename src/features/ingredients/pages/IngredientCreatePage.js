import { Paper } from '@mui/material'
import IngredientCreateForm from '../IngredientCreateForm'

const IngredientCreatePage = () => {
    return (
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
            <IngredientCreateForm />
        </Paper>
    )
}

export default IngredientCreatePage
