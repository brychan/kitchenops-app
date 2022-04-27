import { Fragment } from 'react'
import { Typography, Box, Paper, Button, Grid, styled } from '@mui/material'
import SimpleTable from '../SimpleTable'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.common.white, 
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: '100%'
}))

export default function IngredientsDashboard() {
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
                        <Typography>Total Ingredients in the Library</Typography>
                        <Typography variant="h3">235</Typography>
                    </Item>
                </Grid>
                <Grid item xs={2} sm={3} md={3}>
                    <Item>
                        <Typography>Missing Information or Need Review</Typography>
                        <Typography variant="h3">25</Typography>
                    </Item>
                </Grid>
            </Grid>

            <Box sx={{ marginY: 4 }} />
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Last added ingredients
            </Typography>
            <SimpleTable data={[]} />
            <Box sx={{ marginY: 4, textAlign: 'right'}}>
                <Button variant="contained" size="large" color="secondary">
                    See All
                </Button>
            </Box>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Need Review
            </Typography>
            <SimpleTable data={[]}  />
            <Box sx={{ marginY: 4, textAlign: 'right'}}>
                <Button variant="contained" size="large" color="secondary">
                    See All
                </Button>
            </Box>
        </Fragment>
    )
}
