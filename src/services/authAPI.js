import api from './api'

export async function activateUser(hash) {
    try {
        const response = await api.post('/auth/activate/' + hash)
        return response
    } catch (error) {
        if (error && error.response) {
            return error.response
        }
    }
}

export async function createUser(user) {
    try {
        const response = await api.post('/auth/signup', user)
        return response
    } catch (error) {
        if (error && error.response) {
            return error.response
        }
    }
}

export async function fetchCurrentUser() {
    try {
        const response = await api.get('/auth/user')
        return response
    } catch (error) {
        if (error && error.response) {
            return error.response
        }
    }
}

export async function signInUser(user) {
    try {
        const response = await api.post('/auth/login', user)
        return response
    } catch (error) {
        if (error && error.response) {
            return error.response
        }
    }
}

export async function logoutUser() {
    try {
        const response = await api.get('/auth/logout')
        return response
    } catch (error) {
        if (error && error.response) {
            return error.response
        }
    }
}
