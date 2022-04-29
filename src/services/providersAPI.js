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