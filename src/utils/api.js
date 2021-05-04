import { get, post } from './ajax'

// 获取所有用户
export const getAllUser = () => get('/user/findall')

// 用户登录
export const reqLogin = user => post('/login', user)

// 用户注册
export const reqRegister = user => post('/register', user)

// 用户数据完善
export const reqUpdate = userInfo => post('/update', userInfo)

// 根据ID查询用户信息
export const getUserById = () => get('/user')

// 查询所有User
export const getUserList = () => get('/user/userList')

// 查询所有Boss
export const getBossList = () => get('/user/bossList')

// 查询相关用户的聊天信息
export const getChatList = () => get('/chat/list')

// 查询消息为已读
export const reqRead = from => post('/chat/read', { from })
