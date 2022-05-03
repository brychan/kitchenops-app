import api from './api'
export async function fetchProviders() {
  try {
      const response = await api.get('/api/providers')
      return response.data
  } catch (error) {
      if (error & error.response) {
          return error.response
      }
  }
}

export async function postProvider(provider) {
  try {
    const response = await api.post('/api/providers', provider)
    return response
  } catch (error) {
    if (error & error.response) {
      return error.response
    }
  }
}