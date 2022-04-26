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
