import { RECEIVE_CHAT_LIST, RECEIVE_CHAT, UPDATE_READ_CHAT } from '../constant'

// 接收一条用户消息
export const receiveChat = chat => ({ type: RECEIVE_CHAT, data: chat })

// 当前用户所有消息列表
export const receiveChatList = chats => ({ type: RECEIVE_CHAT_LIST, data: chats })

// 更新已读消息
export const updateReadChat = chats => ({ type: UPDATE_READ_CHAT, data: chats })
