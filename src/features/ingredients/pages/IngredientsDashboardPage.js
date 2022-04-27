import { Fragment, useEffect, useState } from 'react'
import { Typography, Box, Paper, Button, Grid, styled } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SimpleTable from '../SimpleTable'
import { Link } from 'react-router-dom'
import { fetchIngredients } from '../../../services/ingredientsAPI'

const Item = styled(Paper)(({ theme, button }) => ({
    backgroundColor: button
        ? theme.palette.secondary.dark
        : theme.palette.common.white,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: button ? theme.palette.common.white : theme.palette.text.primary,
    height: '100%',
}))

export default function IngredientsDashboard() {
    const [ingredients, setIngredients] = useState({
        lastAdded: {
            results: [],
            total: 0
        },
        missingInfo: {
            results: [],
            total: 0
        },
    })
    console.log(ingredients)
    useEffect(() => {
        Promise.all([fetchIngredients({ sort: ['created_at', 'DESC'] })]).then(
            (responses) => {
                setIngredients({
                    ...ingredients,
                    lastAdded: responses[0],
                })
            }
        )
    }, [])

    const lastAddedTable =
        ingredients.lastAdded.results.length > 0 ? (
            <Fragment>
                <SimpleTable data={ingredients.lastAdded.results} />
                <Box sx={{ marginY: 4, textAlign: 'right' }}>
                    <Button variant="contained" size="large" color="secondary">
                        See All
                    </Button>
                </Box>
            </Fragment>
        ) : (
            <Box>No ingredients to show.</Box>
        )

    const missingInfoTable =
        ingredients.missingInfo.results.length > 0 ? (
            <Fragment>
                <SimpleTable data={[]} />
                <Box sx={{ marginY: 4, textAlign: 'right' }}>
                    <Button variant="contained" size="large" color="secondary">
                        See All
                    </Button>
                </Box>
            </Fragment>
        ) : (
            <Box>No ingredients to show.</Box>
        )
    return (
        <Fragment>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="breadcrumbs">
                    Home / Ingredients / Add Ingredient
                </Typography>
            </Box>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid item xs={2} sm={3} md={3}>
                    <Item>
                        <Typography variant="h5">Total Ingredients</Typography>
                        <Typography sx={{ fontSize: '3rem', marginTop: 2 }}>
                            {ingredients.lastAdded.total}
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={2} sm={3} md={3}>
                    <Item>
                        <Typography variant="h5">
                            Missing Information
                        </Typography>
                        <Typography sx={{ fontSize: '3rem', marginTop: 2 }}>
                            {ingredients.missingInfo.total}
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={2} sm={3} md={3}>
                    <Link
                        to="/ingredients/add"
                        style={{ textDecoration: 'none' }}
                    >
                        <Item button="true">
                            <Typography
                                variant="h5"
                                sx={{ color: '#FFF', fontWeight: 400 }}
                            >
                                Add New Ingredient
                            </Typography>
                            <AddCircleIcon
                                sx={{ fontSize: '4rem', marginTop: 2 }}
                            />
                        </Item>
                    </Link>
                </Grid>
            </Grid>

            <Box sx={{ marginY: 4 }} />
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Last added ingredients
            </Typography>
            {lastAddedTable}
            <Box sx={{ marginY: 4 }} />
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Missing Information
            </Typography>
            {missingInfoTable}
        </Fragment>
    )
}
