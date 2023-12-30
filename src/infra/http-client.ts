import { BASE_API_URL } from '@/constants'
import axios from 'axios'

export const httpClient = axios.create({
	baseURL: BASE_API_URL,
})
