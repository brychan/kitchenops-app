import { Fragment, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import { fetchOneIngredient } from '../../../services/ingredientsAPI'
import { useParams } from 'react-router-dom'

const StyledRowBox = styled(Box)(({ theme }) => ({
    paddingBottom: theme.spacing(4)
}))

const TabBasicInformation = () => {
    const [ingredient, setIngredient] = useState({})
    const { ingredientId } = useParams()
    const theme = useTheme()

    useEffect(() => {
        fetchOneIngredient(ingredientId).then((res) => setIngredient(res))
    }, [])
    return (
        <Fragment>
            <Box>
                <StyledRowBox>
                    <Typography>Name</Typography>
                    <Typography variant="h5">{ingredient.name}</Typography>
                </StyledRowBox>
                <StyledRowBox>
                    <Typography>Description</Typography>
                    <Typography variant="h5">
                        {ingredient.description}
                    </Typography>
                </StyledRowBox>
                <StyledRowBox>
                    <Typography>Brand</Typography>
                    <Typography variant="h5">{ingredient.brand}</Typography>
                </StyledRowBox>
                <StyledRowBox>
                    <Typography>Internal Code</Typography>
                    <Typography variant="h5">
                        {ingredient.code_internal}
                    </Typography>
                </StyledRowBox>
                <StyledRowBox>
                    <Typography>Active</Typography>
                    <Typography variant="h5">
                        {ingredient.active ? 'Yes' : 'No'}
                    </Typography>
                </StyledRowBox>
            </Box>
        </Fragment>
    )
}

export default TabBasicInformation
