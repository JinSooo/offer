import { RECEIVE_USER_LIST } from '../constant'

const initState = []
export default function userListReducer(state = initState, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return [...action.data]
    default:
      return initState
  }
}
