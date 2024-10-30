import instancia, { API } from './Axios'

export const signUpRequest = user => instancia.post(`${API}/signup`,user)
export const getUserById = (id) => instancia.get(`${API}/user/${id}`)

export const loginRequest = user => instancia.post(`${API}/login`,user)

export const verifyTokenRequest = () => instancia.get(`${API}/verify`)

export const LogoutRequest = user => instancia.post(`${API}/logout`,user)

export const isAdminRequest = user => instancia.get(`${API}/dashboard`,user)