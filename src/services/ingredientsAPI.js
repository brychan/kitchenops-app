import api from './api'

export async function postIngredient(ingredient) {
    try {
        const response = await api.post('/api/ingredients/', ingredient)
        return response
    } catch (error) {
        if (error && error.response) {
            return error.response
        }
    }
}


export async function fetchIngredients() {
    try {
        const response = await api.get('/api/ingredients')
        return response.data
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}