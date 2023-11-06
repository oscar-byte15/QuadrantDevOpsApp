import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

const getQuadrantClients = () => {
  return axios.get(webServicesConfig.ADMIN.GET_QUADRANT_CLIENTS)
}

const addQuadrantClient = (name, phone, email) => {
  return axios.post(webServicesConfig.ADMIN.CREATE_QUADRANT_CLIENT, {
    name: name,
    phone: phone,
    email: email
  })
}

const updateQuadrantClient = (id, values) => {
  return axios.put(webServicesConfig.ADMIN.UPDATE_QUADRANT_CLIENT + `/${id}`, { ...values })
}

const getUsers = () => {
  return axios.get(webServicesConfig.ADMIN.GET_USERS)
}

const createUser = (quadrantClientId, name, email, password, roles) => {
  return axios.post(webServicesConfig.USERS.CREATE_USER, {
    quadrantClientId: quadrantClientId,
    name: name,
    email: email,
    password: password,
    roles: roles
  })
}

const updateUser = (userId, quadrantClientId, name, email, roles) => {
  return axios.put(webServicesConfig.USERS.CREATE_USER + `/${userId}`, {
    quadrantClientId: quadrantClientId,
    name: name,
    email: email,
    roles: roles
  })
}

const changeUserPassword = (userId, password) => {
  return axios.put(webServicesConfig.ADMIN.UPDATE_USER_PASSWORD + `/${userId}`, {
    password: password
  })
}

export default {
  getQuadrantClients,
  addQuadrantClient,
  updateQuadrantClient,
  createUser,
  updateUser,
  changeUserPassword,
  getUsers
}
