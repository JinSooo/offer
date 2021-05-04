import { combineReducers } from 'redux'

import userListReducer from './userList'
import userReducer from './user'
import chatReducer from './chat'

export default combineReducers({
  userList: userListReducer,
  user: userReducer,
  chats: chatReducer
})
