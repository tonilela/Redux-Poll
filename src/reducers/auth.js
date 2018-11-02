import { AUTH } from '../constants/actions'

const initialState = {
    user: null
}


export default function auth (state = initialState, action){
  switch(action.type){
    case AUTH.SET_AUTHED_USER:
      return {
        ...state,
       user: action.users[action.id]
      }
    default:
      return state
  }
}