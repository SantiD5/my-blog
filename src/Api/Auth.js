import instancia, { API } from './Axios'

export const signUpRequest = user => instancia.post(`${API}/signup`,user)

export const loginRequest = user => instancia.post(`${API}/login`,user)

export const verifyTokenRequest = () => instancia.get(`${API}/verify`)
