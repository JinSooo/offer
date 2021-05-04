import { AUTH_FAILURE, AUTH_SUCCESS, RECEIVE_USER, RESET_USER } from '../constant'
import { Toast } from 'antd-mobile'

const initState = {
  username: '',
  type: '',
  err: ''
}
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.data, err: '' }
    case AUTH_FAILURE:
      Toast.fail(action.data, 1)
      return { err: action.data }
    case RECEIVE_USER:
      return { ...action.data, err: '' }
    case RESET_USER:
      return { ...initState }
    default:
      return state
  }
}
