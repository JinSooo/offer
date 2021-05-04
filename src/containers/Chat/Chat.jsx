import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Chat.css'
import { reqRead } from '../../utils/api'
import { updateReadChat } from '../../redux/actions/chat'
import { sendMsgIO } from '../../socket'
import Emoji from '../../components/Emoji/Emoji'
import QueueAnim from 'rc-queue-anim'
import { NavBar, List, InputItem, Icon, Toast } from 'antd-mobile'
const Item = List.Item

class Chat extends Component {
  state = {
    content: '',
    isShow: false
  }
  // 返回上一个界面
  goBack = () => this.props.history.goBack()
  // 发送消息
  sendMsg = async () => {
    const fromId = this.props.user._id
    const toId = this.props.match.params.userId
    const { content } = this.state
    console.log(content)
    if (!content) return Toast.fail('请输入内容', 1)
    sendMsgIO({ fromId, toId, content })
    this.setState({ content: '', isShow: false })
  }
  sendMsgByKey = e => {
    if (e.keyCode === 13) this.sendMsg()
  }
  // 滑动到消息底部
  toBottom = () => window.scrollTo(0, document.body.scrollHeight)
  // 显示隐藏表情栏
  toggleEmoji = () => {
    const isShow = !this.state.isShow
    this.setState({ isShow })
    if (isShow) {
      // 异步手动派发resize事件,解决表情列表显示bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }
  }
  // 改变content值
  changeContent = emoji => this.setState({ content: this.state.content + emoji })

  // 消息自动滑到底部
  componentDidMount() {
    this.toBottom()
    // 发请求更新消息的未读数量
    const targetId = this.props.match.params.userId
    reqRead(targetId).then(res =>
      this.props.updateReadChat({ fromId: targetId, toId: this.props.user._id, count: res.data })
    )
  }
  componentDidUpdate() {
    this.toBottom()
    // 发请求更新消息的未读数量
    const targetId = this.props.match.params.userId
    reqRead(targetId).then(res =>
      this.props.updateReadChat({ fromId: targetId, toId: this.props.user._id, count: res.data })
    )
  }

  render() {
    if (!this.props.user._id) return null
    const { users, chats } = this.props.chats
    // 过滤数组,找到和某个用户的聊天信息
    const meId = this.props.user._id
    const targetId = this.props.match.params.userId
    const chatId = [meId, targetId].sort().join('_')
    const filterChats = chats.filter(chat => chat.chatId === chatId)
    // 获取目标用户的信息
    const targetUser = users[targetId]
    if (!targetUser) return null
    const targetAvatar = require(`../../assets/img/${targetUser.avatar}.png`).default || undefined

    return (
      <div id="chat-page">
        <NavBar
          className="sticky-header"
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.goBack}
          rightContent={<Icon key="0" type="ellipsis" />}
        >
          {targetUser.username}
        </NavBar>
        <List className="nav-container" style={{ marginBottom: this.state.isShow ? 187.5 + 44 : 44 }}>
          <QueueAnim onEnd={this.toBottom} interval={25}>
            {filterChats.map(chat => {
              // 对方发给我的
              if (chat.fromId === targetId) {
                return (
                  <Item key={chat._id} thumb={targetAvatar}>
                    {chat.content}
                  </Item>
                )
              } else {
                return (
                  <Item key={chat._id} className="chat-me" extra="我">
                    {chat.content}
                  </Item>
                )
              }
            })}
          </QueueAnim>
        </List>
        <div className="am-tab-bar">
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={_ => this.setState({ content: _ })}
            onKeyDown={this.sendMsgByKey}
            onFocus={() => this.setState({ isShow: false })}
            extra={
              <span>
                <span onClick={this.toggleEmoji} className="emoji">
                  😃
                </span>
                <span onClick={this.sendMsg}>发送</span>
              </span>
            }
          />
          <Emoji isShow={this.state.isShow} changeContent={this.changeContent} />
        </div>
      </div>
    )
  }
}

export default connect(state => ({ user: state.user, chats: state.chats }), { updateReadChat })(Chat)
