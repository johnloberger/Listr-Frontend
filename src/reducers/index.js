import { combineReducers } from 'redux'
import auth from './auth'
import lists from './lists'
import tasks from './tasks'


export default combineReducers({
  auth: auth,
  lists,
  tasks
})
