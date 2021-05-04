import { RECEIVE_USER_LIST } from '../constant'

// 授权成功
export const receiveUserList = userList => ({ type: RECEIVE_USER_LIST, data: userList })
