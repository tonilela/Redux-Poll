import { AUTH } from '../constants/actions'

export function setAuthedUser (users,id) {
  return{
    type: AUTH.SET_AUTHED_USER,
    id:id,
    users: users,
  }
}