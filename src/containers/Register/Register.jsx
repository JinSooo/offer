import React, { Component } from 'react'
import Logo from '../../components/Logo/Logo'
import { reqRegister, getChatList } from '../../utils/api'
import { authSuccess, authFailure } from '../../redux/actions/user'
import { receiveChatList } from '../../redux/actions/chat'
import { connect } from 'react-redux'
import { NavBar, Icon, WingBlank, List, InputItem, WhiteSpace, Radio, Button, Toast } from 'antd-mobile'
const ListItem = List.Item

class Register extends Component {
  state = {
    username: '' /* 用户名 */,
    password: '' /* 密码 */,
    repassword: '' /* 确认密码 */,
    type: 'user' /* 用户类型 (user/boss) */
  }

  // 处理输入表单数据改变的change方法
  handleChange = (name, val) => this.setState({ [name]: val })
  // 注册用户
  register = async () => {
    const { username, password, repassword, type } = this.state
    const { authSuccess, authFailure } = this.props
    if (!username) return authFailure('请输入用户名')
    if (!password) return authFailure('请输入密码')
    if (password !== repassword) return authFailure('两次密码不一致')
    Toast.loading('Loading...')
    // 注册
    const res = await reqRegister({
      username,
      password,
      type
    })
    // 判断注册是否成功
    if (res.code === 0) {
      authSuccess(res.data)
      Toast.success('注册成功', 1, async () => {
        // 获取用户聊天信息
        const chats = await getChatList()
        if (chats.code === 0) this.props.receiveChatList(chats.data)
        if (res.data.type === 'user') return this.props.history.replace('/userinfo')
        this.props.history.replace('/bossinfo')
      })
    } else {
      authFailure(res.msg)
    }
  }
  // 跳转到登录界面
  toLogin = () => this.props.history.replace('/login')
  // 跳转到主界面
  toMain = () => this.props.history.replace('/main')

  render() {
    return (
      <>
        {/* 导航栏 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.toMain}
          rightContent={<Icon key="0" type="ellipsis" />}
        >
          Register
        </NavBar>
        {/* Logo图片 */}
        <Logo />
        {/* 两翼留白 */}
        <WingBlank>
          <List>
            {/* 表单数据 */}
            <InputItem placeholder="请输入用户名" type="text" onChange={val => this.handleChange('username', val)}>
              用户名:
            </InputItem>
            <InputItem placeholder="请输入密码" type="password" onChange={val => this.handleChange('password', val)}>
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <InputItem
              placeholder="再次确认密码"
              type="password"
              onChange={val => this.handleChange('repassword', val)}
            >
              确认密码:
            </InputItem>
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.type === 'user'} onChange={e => this.handleChange('type', 'user')}>
                User
              </Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.type === 'boss'} onChange={e => this.handleChange('type', 'boss')}>
                Boss
              </Radio>
            </ListItem>
            {/* 上下留白 */}
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>
              注&nbsp;&nbsp;&nbsp;册
            </Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </>
    )
  }
}

export default connect(state => ({}), { authSuccess, authFailure, receiveChatList })(Register)
