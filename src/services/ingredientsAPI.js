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

export async function fetchIngredients(filter) {
    try {
        const response = await api.get('/api/ingredients', {
            params: filter,
        })
        return response.data
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}

export async function fetchOneIngredient(id) {
    try {
        const response = await api.get(`/api/ingredients/${id}`)
        return response.data
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}

export async function postCategoryIngredients(category) {
    try {
        const response = await api.post('/api/ingredients/categories', category)
        return response
    } catch (error) {
        if (error && error.response) {
            return error.response
        }
    }
}

export async function fetchCategoryIngredients() {
    try {
        const response = await api.get('/api/ingredients/categories')
        return response.data
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}

export async function fetchOneNutritionIngredients(id) {
    try {
        const response = await api.get(`/api/ingredients/nutrition/${id}`)
        return response.data
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}
export async function patchNutritionIngredients(nutrition) {
    try {
        const response = await api.patch(
            `/api/ingredients/nutrition/${nutrition.id}`,
            nutrition
        )
        return response
    } catch (error) {
        if (error && error.response) {
            return error.response
        }
    }
}
export async function fetchOneAllergensIngredients(id) {
    try {
        const response = await api.get(`/api/ingredients/allergens/${id}`)
        return response.data
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}

export async function patchAllergensIngredients(allergens) {
    try {
        const response = await api.patch(
            `/api/ingredients/allergens/${allergens.id}`,
            allergens
        )
        return response
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}
export async function postPackagingIngredients(packaging) {
    try {
        const response = await api.post('/api/ingredients/packaging', packaging)
        return response
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}

export async function fetchOneIngredientPackagingIngredients(id) {
    try {
        const response = await api.get(`/api/ingredients/packaging/${id}`)
        return response.data
    } catch (error) {
        if (error & error.response) {
            return error.response
        }
    }
}
