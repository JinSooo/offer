import { RECEIVE_CHAT_LIST, RECEIVE_CHAT, UPDATE_READ_CHAT } from '../constant'

const initState = {
  users: {}, // 所有用户信息
  chats: [], // 当前用户的相关聊天信息
  unReadCount: 0 // 未读聊天的总数量
}
export default function chatReducer(state = initState, action) {
  switch (action.type) {
    case RECEIVE_CHAT_LIST:
      const { users, chats, user } = action.data
      const unReadCount = chats.reduce((total, chat) => total + (!chat.isRead && chat.toId === user._id ? 1 : 0), 0)
      return { users, chats, unReadCount }
    case RECEIVE_CHAT:
      const { chatDoc, userId } = action.data
      return {
        users: state.users,
        chats: [...state.chats, chatDoc],
        unReadCount: state.unReadCount + (!chatDoc.isRead && chatDoc.toId === userId ? 1 : 0)
      }
    case UPDATE_READ_CHAT:
      const { fromId, toId, count } = action.data
      const chatsFilter = state.chats.map(chat => {
        if (chat.fromId === fromId && chat.toId === toId && !chat.isRead) {
          return { ...chat, isRead: true }
        } else {
          return chat
        }
      })
      return {
        users: state.users,
        chats: chatsFilter,
        unReadCount: state.unReadCount - count
      }
    default:
      return state
  }
}
