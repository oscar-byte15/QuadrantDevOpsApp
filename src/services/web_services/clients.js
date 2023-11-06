import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

const getUsers = () => axios.get(webServicesConfig.CLIENTS.USERS)

const createUser = (name, email, password, roles, evaluationGroups, customRoles) =>
  axios.post(webServicesConfig.CLIENTS.USERS, {
    name: name,
    email: email,
    password: password,
    roles: roles,
    evaluationGroups: evaluationGroups,
    customRoles: customRoles
  })

const updateUser = (userId, name, email, roles, evaluationGroups, customRoles) =>
  axios.put(webServicesConfig.CLIENTS.USERS + `/${userId}`, {
    name: name,
    email: email,
    roles: roles,
    evaluationGroups: evaluationGroups,
    customRoles: customRoles
  })

export default {
  getUsers,
  updateUser,
  createUser
}
