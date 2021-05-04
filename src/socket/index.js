import { socketIO } from './socket'

const SEND_MSG = 'sendMsg'

// 发送消息
export const sendMsgIO = data => socketIO.emit(SEND_MSG, data)
