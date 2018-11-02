import { combineReducers } from 'redux'
import users from './users'
import polls from './polls'
import auth from './auth'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  polls,
  auth,
  loadingBar: loadingBarReducer,
})