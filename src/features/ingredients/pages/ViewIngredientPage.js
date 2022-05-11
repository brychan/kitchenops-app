import { Fragment, useState, useEffect } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { fetchOneIngredient } from '../../../services/ingredientsAPI'
import {
    useParams,
    Outlet,
    Link,
    useLocation,
    matchPath,
} from 'react-router-dom'

function useRouteMatch(patterns) {
    const { pathname } = useLocation()

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i]
        const possibleMatch = matchPath(pattern, pathname)
        if (possibleMatch !== null) {
            return possibleMatch
        }
    }

    return null
}
function LinkedTabs({id}) {
    // Add routes in descendent orders.
    const routeMatch = useRouteMatch([
        '/ingredients/view/:ingredientId/packaging',
        '/ingredients/view/:ingredientId',
    ])
    const currentTab = routeMatch?.pattern?.path

    return (
        <Tabs value={currentTab}>
            <Tab
                label="Basic Information"
                value="/ingredients/view/:ingredientId"
                to={`/ingredients/view/${id}`}
                component={Link}
            />
            <Tab
                label="Prices & Packaging"
                value="/ingredients/view/:ingredientId/packaging"
                to={`/ingredients/view/${id}/packaging`}
                component={Link}
            />
        </Tabs>
    )
}

export default function ViewIngredientPage() {
    const { ingredientId } = useParams()
    const theme = useTheme()

    const [ingredient, setIngredient] = useState({})
    const [error, setError] = useState()

    useEffect(() => {
        fetchOneIngredient(ingredientId)
            .then((res) => setIngredient(res))
            .catch((err) => setError('There was a problem...'))
    }, [ingredientId])

    if (error) return <div>{error}</div>
    return (
        <Fragment>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="breadcrumbs">
                    Home / Ingredients / Add Ingredient
                </Typography>
            </Box>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                <span style={{ fontWeight: 600, fontSize: '2rem' }}>
                    {ingredient.name}
                </span>
                <span style={{ fontSize: '1.25rem' }}>
                    {ingredient.brand && ` - ${ingredient.brand}`}
                    {ingredient.code_internal &&
                        ` - ${ingredient.code_internal}`}
                </span>
            </Typography>
            <Box
                sx={{
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '8px',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <LinkedTabs id={ingredientId} />
                </Box>
                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Fragment>
    )
}
