import axios from 'axios';
export const API ='http://localhost:4000/api'
const instancia = axios.create({
  baseURL:API,
  withCredentials:true,
})
export default instancia