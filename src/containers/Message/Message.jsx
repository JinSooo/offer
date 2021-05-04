import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
const Item = List.Item
const Brief = Item.Brief

class Message extends Component {
  /**
   * 对chats进行分组
   *  1. 找到每个组的lastChat(最后一条消息),并用容器保存(chatId: lastChat)
   *  2. 得到所有lastChat的数组
   *  3. 对数组进行排序
   */
  getGroupsChats = chats => {
    const { user } = this.props
    // 1
    const lastChatObjs = {}
    chats.forEach(chat => {
      if (chat.toId === user._id && !chat.isRead) chat.unReadCount = 1
      else chat.unReadCount = 0
      const chatId = chat.chatId
      const lastChat = lastChatObjs[chatId]
      if (!lastChat) {
        lastChatObjs[chatId] = chat
      } else {
        // 未读内容数量
        const unReadCount = lastChat.unReadCount + chat.unReadCount
        // 判断日期比较早晚
        if (chat.create_time > lastChat.create_time) {
          lastChatObjs[chatId] = chat
        }
        lastChatObjs[chatId].unReadCount = unReadCount
      }
    })
    // 2
    const groupsChats = Object.values(lastChatObjs)
    // 3
    groupsChats.sort((m1, m2) => m2.create_time - m1.create_time)
    return groupsChats
  }

  toChat = userId => {
    this.props.history.push(`/chat/${userId}`)
  }

  render() {
    const { user } = this.props
    const { users, chats } = this.props.chats
    // 对chats按chatId进行分组
    const groupsChats = this.getGroupsChats(chats)
    return (
      <List>
        <QueueAnim type="left">
          {groupsChats.map(chat => {
            const targetId = chat.toId === user._id ? chat.fromId : chat.toId
            const targetUser = users[targetId]
            return (
              <Item
                key={chat._id}
                extra={<Badge text={chat.unReadCount} />}
                thumb={require(`../../assets/img/${targetUser.avatar}.png`).default}
                arrow="horizontal"
                onClick={() => this.toChat(targetId)}
              >
                {chat.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })}
        </QueueAnim>
      </List>
    )
  }
}

export default connect(state => ({ user: state.user, chats: state.chats }))(Message)
