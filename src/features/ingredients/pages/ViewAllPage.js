import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { Fragment } from 'react'
import SimpleTable from '../SimpleTable'

const ViewAllPage = () => {
    return (
        <Fragment>
            <div>View All Page</div>
            <Button
                component={Link}
                to="/ingredients/add"
                variant="contained"
                size="large"
                color="primary"
            >
                Add New Ingredient
            </Button>
            <SimpleTable />
        </Fragment>
    )
}

export default ViewAllPage
