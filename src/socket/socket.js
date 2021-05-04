// 引入客户端io
import io from 'socket.io/client-dist/socket.io'

export let socketIO = null

export const initIO = (userId, receiveChat) => {
  // 连接服务器
  // const socket = io()
  const socket = io('ws://localhost:3000')
  socketIO = socket

  console.log('open socket.io')

  // 接收发送消息后的返回值
  socket.on('receiveMsg', chatDoc => {
    const { toId, fromId } = chatDoc
    if (toId === userId || fromId === userId) receiveChat({ chatDoc, userId })
  })
}
