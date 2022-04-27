import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import SimpleTable from '../SimpleTable'
import { fetchIngredients } from '../../../services/ingredientsAPI'

const ViewAllPage = () => {
    const [ingredients, setIngredients] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetchIngredients().then((res) => {
            console.log(res)
            setIngredients(res)
            setIsLoading(false)
        })
    }, [])
    if (isLoading)
        return <div>Loading...</div>
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
            <SimpleTable data={ingredients}/>
        </Fragment>
    )
}

export default ViewAllPage
