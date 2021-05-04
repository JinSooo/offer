import { AUTH_SUCCESS, AUTH_FAILURE, RECEIVE_USER, RESET_USER } from '../constant'

// 授权成功
export const authSuccess = user => ({ type: AUTH_SUCCESS, data: user })
// 授权失败
export const authFailure = err => ({ type: AUTH_FAILURE, data: err })
// 接收用户信息
export const receiveUser = err => ({ type: RECEIVE_USER, data: err })
// 重置用户信息
export const resetUser = err => ({ type: RESET_USER, data: err })
