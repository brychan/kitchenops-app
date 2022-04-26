import axios from 'axios'
import { environment } from './endpoints'

export default axios.create({
    baseURL: environment[process.env.NODE_ENV].url,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})
